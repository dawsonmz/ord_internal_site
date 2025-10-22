<script lang="ts">
  import FeedbackDialog from '$lib/components/feedback_dialog.svelte';
  import LinkCard from '$lib/components/link_card.svelte';
  import LinkCardGrid from '$lib/components/link_card_grid.svelte';

  let { form } = $props();
</script>

<div class="flex flex-col gap-6 mx-8">
  <p>Welcome to the Oslo Roller Derby internal website!</p>

  <LinkCardGrid header="Team Resources">
    <LinkCard
        title="A Team Roster"
        description="View the current A Team roster."
        url="/roster-a-team"
    />
    <LinkCard
        title="B Team Roster"
        description="View the current B Team roster."
        url="/roster-b-team"
    />
    <LinkCard
        title="Skater Vault"
        description="View skater numbers and derby names currently registered with ORD."
        url="/skater-vault"
    />
  </LinkCardGrid>

  <LinkCardGrid header="Beginners Training">
    <LinkCard
        title="Training Plans"
        description="View training plans for the ORD beginners course."
        url="/beginner-plans"
    />
    <LinkCard
        title="Modules"
        description="View the individual drills used to assemble beginners training plans."
        url="/beginner-modules"
    />
    <LinkCard
        title="Skills Tracking"
        description="Login required: Track individual skills progress toward completion of beginners program."
        url="/beginner-skills"
    />
  </LinkCardGrid>

  <LinkCardGrid header="Other Resources">
    <LinkCard
        title="Mitt Varsel"
        description="Link to Mitt Varsel, a portal for safe and secure reporting of incidents."
        url="https://portal.mittvarsel.no/skjema/norges-idrettsforbund/SNPZOBQpD7CUt9Er.1532"
        external
    />
  </LinkCardGrid>

  <FeedbackDialog label="Give Feedback" labelClasses="text-xl font-semibold" form={form} />
  <p>
    You can also submit feedback for a specific page by selecting the <strong>Give Feedback</strong> option from the menu.
  </p>
</div>
