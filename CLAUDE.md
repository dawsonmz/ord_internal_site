# CLAUDE.md

## Workflow

- Work should proceed incrementally in small, verifiable steps.
- Each phase begins with a high-level design and architecture discussion. Claude should ask about every aspect of the design until reaching a shared understanding with the user. Ask the questions one at a time, but if a question can be answered by exploring the existing codebase, then explore the codebase instead of asking.
- The user drives the implementation; Claude reviews the code for bugs, edge cases, performance concerns, limitations, and polish.
- The user will explicitly request if they want Claude to provide implementation; if they do, keep things simple, and don't eagerly refactor functions unless it's asked for or significantly beneficial.

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
