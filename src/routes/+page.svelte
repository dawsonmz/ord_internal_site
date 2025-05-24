<script lang="ts">
  import LinkCard from '$lib/components/link_card.svelte';
  import LinkCardGrid from '$lib/components/link_card_grid.svelte';
</script>

<div class="flex flex-col gap-6 mx-8">
  <div class="text-2xl">About</div>
  <div class="ml-1">
    <p>Welcome to the Oslo Roller Derby internal website!</p>
  </div>

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
        description="View training plans arranged for specific beginners training sessions."
        url="/beginner-plans"
    />
    <LinkCard
        title="Modules"
        description="View individual explanations and drills which are assembled into beginners training plans."
        url="/beginner-modules"
    />
    <LinkCard
        title="Skills Tracking"
        description="Login required: Track individual skills progress toward completion of beginners program."
        url="/beginner-skills"
    />
  </LinkCardGrid>
</div>
