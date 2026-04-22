# CLAUDE.md

## Workflow

For any coding task — feature work, refactoring, debugging, architecture, or bare "implement X" requests — Claude must consult the `programming-workflow` skill before proceeding. It enforces a design-first discussion, incremental user-driven progress, and no unprompted file edits. Follow its phases unless the user explicitly asks to skip the design phase.

## Overview

Internal site for Oslo Roller Derby (ORD). Built with SvelteKit, deployed to Cloudflare Workers.

## Features
 
- **Team information**: Roster lists and skater names and numbers.
- **Team resources**: Links to game and scrimmage footage for both teams. Will eventually include playbooks with team strategies, as well as drills for strategy development.
- **Beginners training plans**: Detailed lesson plans used to run beginners training sessions.
- **Beginners modules**: Individual drills categorized by tags which are used to compose training plans.
- **Required skill tracking**: Implementation currently in progress. Tracking of skills required to pass the beginners course on an individual basis, so that coaches can give beginners direct and transparent feedback on what skills need progress.
- **Feedback**: Historical log of feedback provided from team captains to team members, or from team members to themselves.
- **Useful resources**: Links to important team documents and general information.

## Ongoing Projects

### Required Skills

Coaches track beginner skaters' progress on a curriculum of required skills, and leave per-skill feedback. Beginners graduate to team membership once they've completed the curriculum.

#### Data model

- Code: src/lib/server/required_skills.ts
- RequiredSkill: catalog entry from Sanity, general description of a required skill
- RequiredSkillProgress: per-user, per-skill state stored in Firestore under user/{userId}/skill/{skillSlug}

#### Route structure

- /required-skills: coach view, implemented. Requires coach role.
- /required-skills/{userId}: individual skater view. Not yet implemented. Beginners visiting /required-skills will be redirected here based on their own userId.

## Architecture

### Clerk

Authentication and user management. User roles are stored in Clerk session claims defined in Clerk as public metadata. Utility code is used in the various +page.server.ts pages to enforce which pages require authentication and/or specific roles to access.

### Sanity CMS

Dynamic content backend for user-agnostic data, such as rosters, footage, and training plans.

### Google Cloud Firestore

Stores user-specific data, such as user feedback preferences and required skill progress.

Cloud Firestore documents are accessed via the REST API. Documents are defined within the user hierarchy; resource paths start with projects/{FIRESTORE_PROJECT_ID}/databases/(default)/documents/user/{userId} where userId is the same ID provided by Clerk.

### Resend

Sends notification emails for activity requiring admin attention.

### Styling

Tailwind CSS generally used for styling, with Skeleton UI v4 for UI components. Direct css defined for styling that is commonly repeated throughout the project.
