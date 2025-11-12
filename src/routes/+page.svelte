<script lang="ts">
  import FeedbackDialog from '$lib/components/feedback_dialog.svelte';
  import PageLink from '$lib/components/page_link.svelte';
  import PageLinkGroup from '$lib/components/page_link_group.svelte';

  let { data, form } = $props();
</script>

<div class="sm:self-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-fit sm:gap-x-16 md:gap-x-32 gap-y-8">
  <div class="text-2xl font-semibold sm:col-span-2 md:col-span-3 text-center">
    Oslo Roller Derby Internal Site
  </div>
  <PageLinkGroup header="Team Resources">
    <PageLink url="/roster-a-team" width={180}>
      {#snippet text()}
        A Team Roster
      {/snippet}
      {#snippet description()}
        View the current A Team roster, including blocker lines, jammers, and bench crew.
      {/snippet}
    </PageLink>
    <PageLink url="/roster-b-team" width={180}>
      {#snippet text()}
        B Team Roster
      {/snippet}
      {#snippet description()}
        View the current B Team roster, including blocker lines, jammers, and bench crew.
      {/snippet}
    </PageLink>
    <PageLink url="/documents" width={180}>
      {#snippet text()}
        Document Links
      {/snippet}
      {#snippet description()}
        Links to team documents such as the travel coordination spreadsheets, the Google Drive folder for skater photos, etc.
      {/snippet}
    </PageLink>
  </PageLinkGroup>

  <PageLinkGroup header="Training Resources">
    <PageLink url="/footage" width={180}>
      {#snippet text()}
        Footage
      {/snippet}
      {#snippet description()}
        Video footage of ORD scrimmages and games.
      {/snippet}
    </PageLink>
  </PageLinkGroup>

  <PageLinkGroup header="Skater Resources">
    <PageLink url="/skater-vault" width={180}>
      {#snippet text()}
        Skater Vault
      {/snippet}
      {#snippet description()}
        Search for skater numbers and derby names registered with ORD, or reserve your own.
      {/snippet}
    </PageLink>
    <PageLink url="/feedback" width={180}>
      {#snippet text()}
        Feedback Log
      {/snippet}
      {#snippet description()}
        Log of feedback written by yourself, team captains, or bench coaches.
      {/snippet}
    </PageLink>
  </PageLinkGroup>

  <PageLinkGroup header="Beginners">
    <PageLink url="/beginner-plans" width={180}>
      {#snippet text()}
        Training Plans
      {/snippet}
      {#snippet description()}
        View training plans for the ORD beginners course.
      {/snippet}
    </PageLink>
    <PageLink url="/beginner-modules" width={180}>
      {#snippet text()}
        Modules
      {/snippet}
      {#snippet description()}
        View the individual drills used to assemble beginners training plans.
      {/snippet}
    </PageLink>
    <PageLink url="/beginner-skills" width={180}>
      {#snippet text()}
        Skills Tracking
      {/snippet}
      {#snippet description()}
        Track individual skills progress toward completion of beginners program. Requires account login.
      {/snippet}
    </PageLink>
  </PageLinkGroup>

  <PageLinkGroup header="Other Resources">
    <PageLink url="https://rules.wftda.com" external width={180}>
      {#snippet text()}
        WFTDA Rules
      {/snippet}
      {#snippet description()}
        Official rules page for Flat Track Roller Derby.
      {/snippet}
    </PageLink>
    <PageLink url="https://nurds.space" external width={180}>
      {#snippet text()}
        Pack Simulator
      {/snippet}
      {#snippet description()}
        NURDS is a virtual tool for simulating roller derby situations to better understand pack rules.
      {/snippet}
    </PageLink>
    <PageLink url="https://stats.wftda.com/rankings-live/europe" external width={180}>
      {#snippet text()}
        WFTDA Rankings
      {/snippet}
      {#snippet description()}
        Live rankings for WFTDA Europe teams. These are unofficial rankings; official ones are published on the first of every month.
      {/snippet}
    </PageLink>
    <PageLink url="https://portal.mittvarsel.no/skjema/norges-idrettsforbund/SNPZOBQpD7CUt9Er.1532" external width={180}>
      {#snippet text()}
        Mitt Varsel
      {/snippet}
      {#snippet description()}
        Link to Mitt Varsel, a portal for safe and secure reporting of incidents.
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
    <FeedbackDialog triggerClasses="mt-4" label="Website Feedback" labelClasses="text-xl font-semibold" {form} />
    <div class="mt-2">
      You can also submit feedback on any particular page by selecting the <strong>Website Feedback</strong> option from the menu.
    </div>
  </div>
</div>
