<script lang="ts">
  import PageLink from '$lib/components/page_link.svelte';
  import PageLinkGroup from '$lib/components/page_link_group.svelte';

  let { data } = $props();
  const linkWidth = 190;
</script>

<div class="sm:self-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-fit sm:gap-x-16 md:gap-x-32 gap-y-8">
  <div class="text-2xl font-semibold sm:col-span-2 md:col-span-3 text-center">
    Oslo Roller Derby Internal Site
  </div>
  <PageLinkGroup header="Team Rosters">
    <PageLink url="/roster-a-team" width={linkWidth}>
      {#snippet text()}
        A Team Roster
      {/snippet}
      {#snippet description()}
        View the current A Team roster, including blocker lines, jammers, and bench crew.
      {/snippet}
    </PageLink>
    <PageLink url="/roster-b-team" width={linkWidth}>
      {#snippet text()}
        B Team Roster
      {/snippet}
      {#snippet description()}
        View the current B Team roster, including blocker lines, jammers, and bench crew.
      {/snippet}
    </PageLink>
  </PageLinkGroup>

  <PageLinkGroup header="Training Resources">
    <PageLink url="/footage" width={linkWidth}>
      {#snippet text()}
        Footage
      {/snippet}
      {#snippet description()}
        Video footage of ORD scrimmages and games.
      {/snippet}
    </PageLink>
  </PageLinkGroup>

  <PageLinkGroup header="Skater Resources">
    <PageLink url="/skater-vault" width={linkWidth}>
      {#snippet text()}
        Skater Vault
      {/snippet}
      {#snippet description()}
        Search for skater numbers and derby names registered with ORD, or reserve your own.
      {/snippet}
    </PageLink>
    <PageLink url="/feedback" width={linkWidth}>
      {#snippet text()}
        Feedback Log
      {/snippet}
      {#snippet description()}
        Log of feedback written by yourself, team captains, or bench coaches.
      {/snippet}
    </PageLink>
  </PageLinkGroup>

  <PageLinkGroup header="Beginners">
    <PageLink url="/beginner-plans" width={linkWidth}>
      {#snippet text()}
        Training Plans
      {/snippet}
      {#snippet description()}
        View training plans for the ORD beginners course.
      {/snippet}
    </PageLink>
    <PageLink url="/beginner-modules" width={linkWidth}>
      {#snippet text()}
        Modules
      {/snippet}
      {#snippet description()}
        View the individual drills used to assemble beginners training plans.
      {/snippet}
    </PageLink>
    <PageLink url="/required-skills" width={linkWidth}>
      {#snippet text()}
        Required Skills
      {/snippet}
      {#snippet description()}
        Track individual skills progress toward completion of beginners program.
      {/snippet}
    </PageLink>
  </PageLinkGroup>

  <PageLinkGroup header="Club Resources">
    <PageLink url="/documents" width={linkWidth}>
      {#snippet text()}
        Documents
      {/snippet}
      {#snippet description()}
        Links to team documents such as the travel coordination spreadsheets, the Google Drive folder for skater photos, etc.
      {/snippet}
    </PageLink>
    <PageLink url="/reporting" width={linkWidth}>
      {#snippet text()}
        Reporting Incidents
      {/snippet}
      {#snippet description()}
        Overview of our safe and secure process for reporting incidents.
      {/snippet}
    </PageLink>
  </PageLinkGroup>

  <PageLinkGroup header="Other Resources">
    <PageLink url="https://rules.wftda.com" external width={linkWidth}>
      {#snippet text()}
        WFTDA Rules
      {/snippet}
      {#snippet description()}
        Official rules page for Flat Track Roller Derby.
      {/snippet}
    </PageLink>
    <PageLink url="https://nurds.space" external width={linkWidth}>
      {#snippet text()}
        Pack Simulator
      {/snippet}
      {#snippet description()}
        NURDS is a virtual tool for simulating roller derby situations to better understand pack rules.
      {/snippet}
    </PageLink>
    <PageLink url="https://stats.wftda.com/rankings-live/europe" external width={linkWidth}>
      {#snippet text()}
        WFTDA Rankings
      {/snippet}
      {#snippet description()}
        Live rankings for WFTDA Europe teams. These are unofficial rankings; official ones are published on the first of every month.
      {/snippet}
    </PageLink>
  </PageLinkGroup>

  <div class="sm:col-span-2 md:col-span-3">
    <div class="text-xl font-semibold mb-2">Website Updates</div>
    <div class="subheading mb-2">Latest update post: {data.latest_update_date}</div>
    <PageLink url="/updates">
      {#snippet text()}
        Read about changes to the website here!
      {/snippet}
    </PageLink>
  </div>
</div>
