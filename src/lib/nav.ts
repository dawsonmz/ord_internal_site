// Single source of truth for the site navigation structure, rendered by both
// the home page (src/routes/+page.svelte) and the navigation drawer
// (src/routes/+layout.svelte).

export interface NavLink {
  label: string;
  url: string;
  external?: boolean;
  description: string;
}

export interface NavGroup {
  header: string;
  links: NavLink[];
}

export const navGroups: NavGroup[] = [
  {
    header: 'Rosters',
    links: [
      {
        label: 'A Team Roster',
        url: '/roster-a-team',
        description: 'View the current A Team roster, including blocker lines, jammers, and bench crew.',
      },
      {
        label: 'B Team Roster',
        url: '/roster-b-team',
        description: 'View the current B Team roster, including blocker lines, jammers, and bench crew.',
      },
    ],
  },
  {
    header: 'Training',
    links: [
      {
        label: 'Footage',
        url: '/footage',
        description: 'Video footage of ORD scrimmages and games.',
      },
    ],
  },
  {
    header: 'Skater Resources',
    links: [
      {
        label: 'Skater Vault',
        url: '/skater-vault',
        description: 'Search for skater numbers and derby names registered with ORD, or reserve your own.',
      },
      {
        label: 'Feedback Log',
        url: '/feedback',
        description: 'Log of feedback written by yourself, team captains, or bench coaches.',
      },
    ],
  },
  {
    header: 'Beginners',
    links: [
      {
        label: 'Training Plans',
        url: '/beginner-plans',
        description: 'View training plans for the ORD beginners course.',
      },
      {
        label: 'Modules',
        url: '/beginner-modules',
        description: 'View the individual drills used to assemble beginners training plans.',
      },
      {
        label: 'Skills Tracking',
        url: '/required-skills',
        description: 'Track individual skills progress toward completion of beginners program.',
      },
    ],
  },
  {
    header: 'Club',
    links: [
      {
        label: 'Documents',
        url: '/documents',
        description: 'Links to team documents such as the travel coordination spreadsheets, the Google Drive folder for skater photos, etc.',
      },
      {
        label: 'Reporting Incidents',
        url: '/reporting',
        description: 'Overview of our safe and secure process for reporting incidents.',
      },
    ],
  },
  {
    header: 'Other',
    links: [
      {
        label: 'WFTDA Rules',
        url: 'https://rules.wftda.com',
        external: true,
        description: 'Official rules page for Flat Track Roller Derby.',
      },
      {
        label: 'Pack Simulator',
        url: 'https://nurds.space',
        external: true,
        description: 'NURDS is a virtual tool for simulating roller derby situations to better understand pack rules.',
      },
      {
        label: 'WFTDA Rankings',
        url: 'https://stats.wftda.com/rankings-live/europe',
        external: true,
        description: 'Live rankings for WFTDA Europe teams. These are unofficial rankings; official ones are published on the first of every month.',
      },
    ],
  },
];
