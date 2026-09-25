import { error } from '@sveltejs/kit';
import { getCollectionGroupDocuments, getDocument, getDocuments, patchDocument } from '$lib/server/firestore';
import { type ModuleTag } from '$lib/server/modules';
import { getUser } from '$lib/server/users';
import { sanityClient } from '$lib/util/sanity';

export type SkillStage = 'Fundamentals' | 'Basic Contact' | 'Controlled Gameplay' | 'Full Gameplay';
export type ProgressState = 'Not started' | 'In progress' | 'Completed';

export interface RequiredSkill {
  stage: SkillStage,
  title: string,
  slug: string,
  importance: string,
  key_points: string[],
  module_tag: ModuleTag,
}

export interface RequiredSkillProgress {
  user_id: string,
  skill_slug: string,
  progress: ProgressState,
  feedback: RequiredSkillFeedback[],
}

export interface RequiredSkillFeedback {
  timestamp: string,
  author_name: string,
  text: string,
}

export async function loadRequiredSkills(): Promise<RequiredSkill[]> {
  const requiredSkills = await sanityClient.option.fetch(
      `*[_type == "required_skill"] | order(orderRank asc) {
        stage,
        title,
        "slug": slug.current,
        importance,
        key_points,
        "module_tag": module_tag-> {
          name,
          "slug": slug.current,
          color,
        },
      }`
  );

  return requiredSkills;
}

export async function loadRequiredSkillProgress(userId: string): Promise<Record<string, RequiredSkillProgress>> {
  return buildSkillProgressMap(
      userId,
      await getDocuments([{ collection: 'user', document_id: userId }], 'skill'),
  );
}

export async function loadRequiredSkillProgressForAll(userIds: string[]): Promise<Map<string, Record<string, RequiredSkillProgress>>> {
  const documentsByUser = Map.groupBy(
      await getCollectionGroupDocuments('skill'),
      (doc: any) => doc.name.split('/').at(-3) as string,
  );

  const result = new Map<string, Record<string, RequiredSkillProgress>>();
  userIds.forEach(
      userId => {
        // All users should be mapped, even if there aren't any documents present (i.e. new user).
        const skillDocuments = documentsByUser.get(userId) ?? [];
        result.set(userId, buildSkillProgressMap(userId, skillDocuments));
      }
  );

  return result;
}

function buildSkillProgressMap(userId: string, skillProgressDocuments: any[]): Record<string, RequiredSkillProgress> {
  return Object.fromEntries(
      skillProgressDocuments.map(
          document => {
            const slug = document.name.split('/').at(-1);
            const feedback = document.fields.feedback?.arrayValue?.values ?? [];
            return [
              slug,
              {
                user_id: userId,
                skill_slug: slug,
                progress: document.fields.progress?.stringValue ?? 'Not started',
                feedback: feedback.map(
                    (feedback: any) => ({
                      timestamp: feedback.mapValue.fields.timestamp.stringValue,
                      author_name: feedback.mapValue.fields.author_name.stringValue,
                      text: feedback.mapValue.fields.text.stringValue,
                    })
                ),
              },
            ];
          }
      )
  );
}

export async function updateRequiredSkillProgress(
    actorId: string,
    userId: string,
    skillSlug: string,
    progress: string | undefined,
    feedback: string | undefined,
    cache: KVNamespace,
) {
  const [ user, requiredSkills ] = await Promise.all(
      [
        getUser(userId, cache),
        loadRequiredSkills(),
      ]
  );

  // Verify that the user whose progress is being updated is in fact a beginner.
  if (!user.roles.includes('beginner')) {
    error(400, `User ${userId} is not a beginner`);
  }

  // Verify that progress is a valid value. Undefined is valid if it hasn't been updated.
  if (progress && !['Not started', 'In progress', 'Completed'].includes(progress)) {
    error(400, `Invalid progress provided: ${progress}`);
  }

  // Verify that skill slug is a valid skill.
  if (!requiredSkills.map(skill => skill.slug).includes(skillSlug)) {
    error(400, `Invalid skill slug: ${skillSlug}`);
  }

  if (feedback && feedback.length > 3000) {
    error(400, `Feedback text too long`);
  }

  const fieldUpdates = [];

  if (progress) {
    fieldUpdates.push({ field: 'progress', value: { stringValue: progress } });
  }

  if (feedback) {
    const [ actor, existingFeedbackDocument ] = await Promise.all(
        [
          getUser(actorId, cache),
          getDocument(
              [
                { collection: 'user', document_id: userId },
                { collection: 'skill', document_id: skillSlug },
              ]
          ),
        ]
    );

    const feedbackArray = [
      ...(existingFeedbackDocument?.fields.feedback?.arrayValue?.values ?? []),
      {
        mapValue: {
          fields: {
            timestamp: { stringValue: new Date().toISOString() },
            author_name: { stringValue: actor.name },
            text: { stringValue: feedback },
          },
        },
      },
    ];
  
    fieldUpdates.push(
        {
          field: 'feedback',
          value: { arrayValue: { values: feedbackArray } },
        }
    );
  }

  if (fieldUpdates.length) {
    await patchDocument(
        [
          { collection: 'user', document_id: userId },
          { collection: 'skill', document_id: skillSlug },
        ],
        fieldUpdates,
    );
  }
}
