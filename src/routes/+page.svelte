<script lang="ts">
  import FeedbackDialog from '$lib/components/feedback_dialog.svelte';
  import PageLink from '$lib/components/page_link.svelte';
  import PageLinkGroup from '$lib/components/page_link_group.svelte';

  let { form } = $props();
</script>

<div class="flex flex-col gap-6 sm:gap-8 mx-8">
  <p>Welcome to the Oslo Roller Derby internal website!</p>

  <div class="flex max-sm:flex-col max-sm:gap-6">
    <PageLinkGroup header="Team Resources">
      <PageLink url="/roster-a-team" width={168}>
        {#snippet text()}
          A Team Roster
        {/snippet}
        {#snippet description()}
          View the current A Team roster, including blocker lines, jammers, and bench crew.
        {/snippet}
      </PageLink>
      <PageLink url="/roster-b-team" width={168}>
        {#snippet text()}
          B Team Roster
        {/snippet}
        {#snippet description()}
          View the current B Team roster, including blocker lines, jammers, and bench crew.
        {/snippet}
      </PageLink>
      <PageLink url="/skater-vault" width={168}>
        {#snippet text()}
          Skater Vault
        {/snippet}
        {#snippet description()}
          Search for skater numbers and derby names registered with ORD, or reserve your own.
        {/snippet}
      </PageLink>
    </PageLinkGroup>

    <PageLinkGroup header="Beginners">
      <PageLink url="/beginner-plans" width={168}>
        {#snippet text()}
          Training Plans
        {/snippet}
        {#snippet description()}
          View training plans for the ORD beginners course.
        {/snippet}
      </PageLink>
      <PageLink url="/beginner-modules" width={168}>
        {#snippet text()}
          Modules
        {/snippet}
        {#snippet description()}
          View the individual drills used to assemble beginners training plans.
        {/snippet}
      </PageLink>
      <PageLink url="/beginner-skills" width={168}>
        {#snippet text()}
          Skills Tracking
        {/snippet}
        {#snippet description()}
          Track individual skills progress toward completion of beginners program. Requires account login.
        {/snippet}
      </PageLink>
    </PageLinkGroup>
  </div>

  <div class="flex max-sm:flex-col max-sm:gap-6">
    <PageLinkGroup header="Other Resources">
      <PageLink url="https://portal.mittvarsel.no/skjema/norges-idrettsforbund/SNPZOBQpD7CUt9Er.1532" external width={168}>
        {#snippet text()}
          Mitt Varsel
        {/snippet}
        {#snippet description()}
          Link to Mitt Varsel, a portal for safe and secure reporting of incidents.
        {/snippet}
      </PageLink>
    </PageLinkGroup>
  </div>

  <div>
    <FeedbackDialog baseClasses="mb-3" label="Give Feedback" labelClasses="text-xl font-semibold" form={form} />
    <p>
      You can also submit feedback for a specific page by selecting the <strong>Give Feedback</strong> option from the menu.
    </p>
  </div>
</div>
