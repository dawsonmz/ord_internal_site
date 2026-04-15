import { getCollectionGroupDocuments, getDocument, getDocuments, patchDocument } from '$lib/server/firestore';
import { type ModuleTag } from '$lib/server/modules';;
import { sanityClient } from '$lib/util/sanity';

export interface RequiredSkill {
  stage: string,
  title: string,
  slug: string,
  importance: string,
  key_points: string[],
  module_tag: ModuleTag,
}

export interface RequiredSkillProgress {
  user_id: string,
  skill: RequiredSkill,
  progress: 'Not started' | 'In progress' | 'Complete',
  feedback: RequiredSkillFeedback[],
}

export interface RequiredSkillFeedback {
  timestamp: string,
  author_name: string,
  text: string,
}

async function loadRequiredSkills(): Promise<RequiredSkill[]> {
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

export async function loadRequiredSkillProgress(userId: string): Promise<RequiredSkillProgress[]> {
  const [ requiredSkills, skillDocuments ] = await Promise.all(
      [
        loadRequiredSkills(),
        getDocuments([{ collection: 'user', document_id: userId }], 'skill'),
      ]
  );

  return buildSkillProgressMap(userId, requiredSkills, skillDocuments);
}

export async function loadAllRequiredSkillProgress(): Promise<Map<string, RequiredSkillProgress[]>> {
  const [ requiredSkills, allSkillDocuments ] = await Promise.all(
      [
        loadRequiredSkills(),
        getCollectionGroupDocuments('skill'),
      ]
  );

  const documentsByUser = Map.groupBy(
      allSkillDocuments,
      (doc: any) => doc.name.split('/').at(-3) as string,
  );

  const result = new Map<string, RequiredSkillProgress[]>();
  documentsByUser.forEach(
      (skillDocuments, userId) =>
          result.set(userId, buildSkillProgressMap(userId, requiredSkills, skillDocuments))
  );

  return result;
}

function buildSkillProgressMap(
    userId: string,
    requiredSkills: RequiredSkill[],
    skillProgressDocuments: any[],
): RequiredSkillProgress[] {
  const progressBySlug = Object.fromEntries(
      skillProgressDocuments.map(document => [ document.name.split('/').at(-1), document ])
  );

  return requiredSkills.map(
      skill => {
        const progressDocument = progressBySlug[skill.slug];
        const feedbackArray = progressDocument?.fields.feedback?.arrayValue?.values ?? [];
        return {
          user_id: userId,
          skill,
          progress: progressDocument?.fields.progress.stringValue ?? 'Not started',
          feedback: feedbackArray.map(
              (feedback: any) => ({
                timestamp: feedback.mapValue.fields.timestamp.stringValue,
                author_name: feedback.mapValue.fields.timestamp.stringValue,
                text: feedback.mapValue.fields.text.stringValue,
              })
          ),
        };
      }
  );
}

export async function updateRequiredSkillProgress(
    userId: string,
    skillSlug: string,
    progress?: 'Not started' | 'In progress' | 'Complete',
    feedbackAuthorName?: string,
    feedbackText?: string,
) {
  const fieldUpdates = [];

  if (progress) {
    fieldUpdates.push({ field: 'progress', value: { stringValue: progress } });
  }

  if (feedbackText) {
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
            author_name: { stringValue: feedbackAuthorName! },
            text: { stringValue: feedbackText },
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
