<script lang="ts">
  import { MessageSquareShare } from '@lucide/svelte';
  import FeedbackModal from '$lib/components/feedback_modal.svelte';
  import LinkCard from '$lib/components/link_card.svelte';
  import LinkCardGrid from '$lib/components/link_card_grid.svelte';

  let { form } = $props();
</script>

<div class="flex flex-col gap-6 mx-8">
  <p>Welcome to the Oslo Roller Derby internal website!</p>

  <LinkCardGrid header="Team Resources">
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

  <FeedbackModal baseClasses="text-xl font-semibold" label="Submit feedback here!" iconSize={6} form={form} />

  <p>You can additionally submit feedback for any page by opening the menu and clicking on the feedback link at the bottom.</p>
  <p class="-mt-4">Some individual sections such as modules show the <MessageSquareShare class="inline size-5 mx-1" /> icon for providing feedback specific to that section.</p>
</div>
