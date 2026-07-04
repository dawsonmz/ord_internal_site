export const ROLES = [
  'admin',
  'member',
  'beginner',
  'graduated_beginner',
  'coach',
  'feedback_writer_a_team',
  'feedback_writer_b_team',
] as const;

export type Role = typeof ROLES[number];
