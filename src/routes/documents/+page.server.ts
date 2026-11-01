import type { Actions } from './$types';
import { requestAccess } from '$lib/server/request_access';
import { checkAccess } from '$lib/server/roles';

const LINK_GROUPS = [
  {
    header: 'Team Links',
    links: [
      {
        label: 'A Team Travel Document',
        url: 'https://docs.google.com/spreadsheets/d/10N8UfN49Ty-Sb5VWHOEYWSn1vi0sk5eRWGjpfPJJwCc/edit?usp=sharing',
        description: 'Google Sheets document used for coordinating travel and accommodation for A Team away games.',
      },
      {
        label: 'B Team Travel Document',
        url: 'https://docs.google.com/spreadsheets/d/1-O3bYEzgagenXJTwTNgHYX1YdaOwN_W1ey4WlZO0eTY/edit?usp=sharing',
        description: 'Google Sheets document used for coordinating travel and accommodation for B Team away games.',
      },
      {
        label: 'Player Photos',
        url: 'https://drive.google.com/drive/folders/1W2RgC0UHlUueEEdfAWvKJmj4HKRobpEc?usp=sharing',
        description: 'Google Drive folder with skater photos used for roster social media posts before games.',
      },
    ],
  },
  {
    header: 'Club Links',
    links: [
      {
        label: 'Committee Overview',
        url: 'https://docs.google.com/document/d/1Ds_PQc3xQrRm0iSiTuy25AaaxztOrTchawE_D8KSvX8/edit?usp=sharing',
        description: 'Google Document describing the different ORD committees and their members.',
      },
      {
        label: 'Scholarship Fund',
        url: 'https://docs.google.com/document/d/1YstTLuXFQ_56Bh-uvhLUlzKCYV5WJ3sSMQeAglegX2k/edit?usp=sharing',
        description: 'Google Document detailing the application process for the ORD scholarship fund.',
      },
      {
        label: 'Code of Conduct',
        url: 'https://docs.google.com/document/d/1TlCPurCfia8CNF9NxlmExKkTxRPnRt3PWYInsBlRkIk/edit?usp=sharing',
        description: 'The ORD code of conduct approved in 2024 which is shared with visiting teams and officials.',
      },
    ],
  },
];

export async function load({ locals }) {
  checkAccess(locals, 'member');
  return { link_groups: LINK_GROUPS };
}

export const actions = { requestaccess: requestAccess } satisfies Actions;
