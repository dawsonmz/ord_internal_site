<script lang="ts">
    import LinkCard from '$lib/components/ui/link_card.svelte';
    import LinkCardGrid from '$lib/components/ui/link_card_grid.svelte';
</script>

<div class="flex flex-col gap-6 mx-8">
    <div class="text-2xl font-semibold">Welcome</div>
    <div class="ml-1">
        <p>Welcome to the Oslo Roller Derby internal website! If you have any feedback or questions, please reach out to Creek.</p>
    </div>

    <div class="text-2xl font-semibold">Team Resources</div>
    <div class="ml-1">
        <p><em>Under construction.</em></p>
    </div>

    <LinkCardGrid header="Beginners Training">
        <LinkCard
            title="Training Plans"
            description="View training plans arranged for specific beginners training sessions."
            url="/beginner-plans"
        />
        <LinkCard
            title="Modules"
            description="View the individual modules (drills, exercises, etc.) which are assembled into beginners training plans."
            url="/beginner-modules"
        />
    </LinkCardGrid>
</div>
