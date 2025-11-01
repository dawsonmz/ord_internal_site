<script lang="ts">
  import FeedbackDialog from '$lib/components/feedback_dialog.svelte';
  import PageLink from '$lib/components/page_link.svelte';
  import PageLinkGroup from '$lib/components/page_link_group.svelte';

  let { form } = $props();
</script>

<div class="flex flex-col gap-6 mt-4">
  <div class="flex max-md:flex-col max-md:gap-6">
    <PageLinkGroup header="Team Resources" width={300}>
      <PageLink url="/roster-a-team" width={190}>
        {#snippet text()}
          A Team Roster
        {/snippet}
        {#snippet description()}
          View the current A Team roster, including blocker lines, jammers, and bench crew.
        {/snippet}
      </PageLink>
      <PageLink url="/roster-b-team" width={190}>
        {#snippet text()}
          B Team Roster
        {/snippet}
        {#snippet description()}
          View the current B Team roster, including blocker lines, jammers, and bench crew.
        {/snippet}
      </PageLink>
      <PageLink url="/documents" width={190}>
        {#snippet text()}
          Document Links
        {/snippet}
        {#snippet description()}
          Links to team documents such as the travel coordination spreadsheets, the Google Drive folder for skater photos, etc.
        {/snippet}
      </PageLink>
    </PageLinkGroup>

    <PageLinkGroup header="Training Resources" width={300}>
      <PageLink url="/footage" width={190}>
        {#snippet text()}
          Footage
        {/snippet}
        {#snippet description()}
          Video footage of ORD scrimmages and games.
        {/snippet}
      </PageLink>
    </PageLinkGroup>

    <PageLinkGroup header="Skater Resources" width={300}>
      <PageLink url="/skater-vault" width={190}>
        {#snippet text()}
          Skater Vault
        {/snippet}
        {#snippet description()}
          Search for skater numbers and derby names registered with ORD, or reserve your own.
        {/snippet}
      </PageLink>
    </PageLinkGroup>
  </div>

  <div class="flex max-md:flex-col max-md:gap-6">
    <PageLinkGroup header="Beginners" width={300}>
      <PageLink url="/beginner-plans" width={190}>
        {#snippet text()}
          Training Plans
        {/snippet}
        {#snippet description()}
          View training plans for the ORD beginners course.
        {/snippet}
      </PageLink>
      <PageLink url="/beginner-modules" width={190}>
        {#snippet text()}
          Modules
        {/snippet}
        {#snippet description()}
          View the individual drills used to assemble beginners training plans.
        {/snippet}
      </PageLink>
      <PageLink url="/beginner-skills" width={190}>
        {#snippet text()}
          Skills Tracking
        {/snippet}
        {#snippet description()}
          Track individual skills progress toward completion of beginners program. Requires account login.
        {/snippet}
      </PageLink>
    </PageLinkGroup>

    <PageLinkGroup header="Other Resources" width={300}>
      <PageLink url="https://stats.wftda.com/rankings-live/europe" external width={190}>
        {#snippet text()}
          WFTDA Rankings
        {/snippet}
        {#snippet description()}
          Live rankings for WFTDA Europe teams. These are unofficial rankings; official ones are published on the first of every month.
        {/snippet}
      </PageLink>
      <PageLink url="https://portal.mittvarsel.no/skjema/norges-idrettsforbund/SNPZOBQpD7CUt9Er.1532" external width={190}>
        {#snippet text()}
          Mitt Varsel
        {/snippet}
        {#snippet description()}
          Link to Mitt Varsel, a portal for safe and secure reporting of incidents.
        {/snippet}
      </PageLink>
    </PageLinkGroup>
  </div>

  <div class="flex flex-col gap-2 mt-4">
    <FeedbackDialog label="Give Feedback" labelClasses="text-xl font-semibold" form={form} />
    <div>
      You can also submit feedback on any particular page by selecting the <strong>Give Feedback</strong> option from the menu.
    </div>
  </div>
</div>
