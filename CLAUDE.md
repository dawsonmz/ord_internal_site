# CLAUDE.md

## Workflow

For any coding task — feature work, refactoring, debugging, architecture, or bare "implement X" requests — Claude must consult the `programming-workflow` skill before proceeding. It enforces a design-first discussion, incremental progress, and no unprompted file edits. Follow its phases unless the user explicitly asks to skip the design phase.

## Overview

Internal site for Oslo Roller Derby (ORD). Built with SvelteKit, deployed to Cloudflare Workers.

## Features
 
- **Team information**: Roster lists and skater names and numbers.
- **Playbook**: Collection of plays and strategies currently being practiced by the team. Includes descriptions, animated diagrams, and relevant drills. The scenario list is defined as a constant both here and in ord_internal_studio, and both must be kept in sync.
- **Footage**: Links to footage on YouTube and Twitch of games and scrimmages.
- **Beginners training plans**: Detailed lesson plans used to run beginners training sessions.
- **Beginners modules**: Individual drills categorized by tags which are used to compose training plans.
- **Required skill tracking**: Tracking of skills required to pass the beginners course on an individual basis, so that coaches can give beginners direct and transparent feedback on what skills need progress.
- **Feedback**: Historical log of feedback provided from team captains to team members, or from team members to themselves.
- **Useful resources**: Links to important team documents and general information.

## Useful for later

If PowerPoint exported videos do not have sufficient keyframes, use this to modify the video:

`ffmpeg -i export.mp4 -c:v libx264 -pix_fmt yuv420p -crf 20 -g 6 -keyint_min 6 -sc_threshold 0 -bf 0 -movflags +faststart -an play.mp4`

## Architecture

### Clerk

Authentication and user management. User roles are stored in Clerk session claims defined in Clerk as public metadata. Utility code is used in the various +page.server.ts pages to enforce which pages require authentication and/or specific roles to access.

### CloudFlare KV

Clerk user list is cached in CloudFlare KV. Clerk sends user events and invalidates the user cache when users are added, deleted, or updated.

### Sanity CMS

Dynamic content backend for user-agnostic data, such as rosters, footage, and training plans.

### Google Cloud Firestore

Stores user-specific data, such as user feedback preferences and required skill progress.

Cloud Firestore documents are accessed via the REST API. Documents are defined within the user hierarchy; resource paths start with projects/{FIRESTORE_PROJECT_ID}/databases/(default)/documents/user/{userId} where userId is the same ID provided by Clerk.

### Resend

Sends notification emails for activity requiring admin attention.

### Styling

Tailwind CSS generally used for styling, with Skeleton UI v4 for UI components. Direct css defined for styling that is commonly repeated throughout the project.
