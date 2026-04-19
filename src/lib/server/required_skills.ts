import { getCollectionGroupDocuments, getDocument, getDocuments, patchDocument } from '$lib/server/firestore';
import { type ModuleTag } from '$lib/server/modules';
import { sanityClient } from '$lib/util/sanity';

export interface RequiredSkill {
  stage: 'Fundamentals' | 'Basic Contact' | 'Controlled Gameplay' | 'Full Gameplay',
  title: string,
  slug: string,
  importance: string,
  key_points: string[],
  module_tag: ModuleTag,
}

export type ProgressState = 'Not started' | 'In progress' | 'Completed';

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
    userId: string,
    skillSlug: string,
    progress?: ProgressState,
    feedback?: { author_name: string, text: string },
) {
  const fieldUpdates = [];

  if (progress) {
    fieldUpdates.push({ field: 'progress', value: { stringValue: progress } });
  }

  if (feedback) {
    const existingFeedbackDocument = await getDocument(
        [
          { collection: 'user', document_id: userId },
          { collection: 'skill', document_id: skillSlug },
        ]
    );

    const feedbackArray = [
      ...(existingFeedbackDocument?.fields.feedback?.arrayValue?.values ?? []),
      {
        mapValue: {
          fields: {
            timestamp: { stringValue: new Date().toISOString() },
            author_name: { stringValue: feedback.author_name },
            text: { stringValue: feedback.text },
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
