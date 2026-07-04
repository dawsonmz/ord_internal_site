<script lang="ts">
  import { enhance } from '$app/forms';
  import AnimatedCheck from '$lib/components/animated_check.svelte';
  import AnimatedDots from '$lib/components/animated_dots.svelte';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import { ROLES } from '$lib/util/roles';

  let { data, form } = $props();

  let editedRoles: Record<string, Role[]> = $state(
      Object.fromEntries(data.users.map(user => [ user.user_id, [ ...user.roles ] ]))
  );
  let submitting = $state(false);

  let dirty = $derived(
      data.users.filter(user => !sameRoles(editedRoles[user.user_id] ?? user.roles, user.roles))
  );

  let updatesPayload = $derived(
      JSON.stringify(dirty.map(user => ({ user_id: user.user_id, roles: editedRoles[user.user_id] })))
  );

  let failuresByUser = $derived(
      new Map(
          (form?.failures ?? []).map(
              (failure: { user_id: string, message: string }) => [ failure.user_id, failure.message ]
          )
      )
  );

  function sameRoles(a: Role[], b: Role[]): boolean {
    if (a.length != b.length) {
      return false;
    }
    const bSet = new Set(b);
    return a.every(role => bSet.has(role));
  }

  function roleLabel(role: Role): string {
    return role.replaceAll('_', ' ');
  }
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Admin</CrumbPage>
</Crumb>

<div class="flex flex-col gap-4">
  <div class="text-2xl font-semibold">User Roles</div>

  <form
      method="POST"
      action="?/update"
      use:enhance={
        () => {
          submitting = true;
          return async ({ update }) => {
            await update({ reset: false });
            submitting = false;
          };
        }
      }
  >
    <input type="hidden" name="updates" value={updatesPayload} />

    <div class="overflow-x-auto">
      <table class="border-collapse">
        <thead>
          <tr class="text-xs uppercase font-light">
            <th class="text-left p-2">Name</th>
            {#each ROLES as role}
              <th class="p-2 capitalize w-32 align-bottom">{roleLabel(role)}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each data.users as user (user.user_id)}
            {@const isSelf = user.user_id == data.actor_user_id}
            {@const failureMessage = failuresByUser.get(user.user_id)}
            <tr class="border-t border-(--light-color)">
              <td class="p-2 font-medium whitespace-nowrap">
                {user.name}
                {#if isSelf}<span class="text-xs font-light ml-1">(you)</span>{/if}
                {#if failureMessage}
                  <div class="text-xs text-red-600">{failureMessage}</div>
                {/if}
              </td>
              {#each ROLES as role}
                <td class="p-2 text-center">
                  <input
                      type="checkbox"
                      bind:group={editedRoles[user.user_id]}
                      value={role}
                      aria-label="{user.name}: {roleLabel(role)}"
                      disabled={isSelf && role == 'admin'}
                      title={isSelf && role == 'admin' ? "You can't remove your own admin role" : ''}
                  />
                </td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="flex gap-3 mt-4 items-center">
      <button
          type="submit"
          class="flex justify-center items-center min-w-[100px] h-[32px] text-sm p-2 button-style"
          disabled={submitting || dirty.length == 0}
      >
        {#if submitting}
          <AnimatedDots />
        {:else}
          Save
        {/if}
      </button>
      {#if form?.failures && form.failures.length > 0}
        <span class="text-sm text-red-600">{form.failures.length} update(s) failed.</span>
      {:else if form?.failures && dirty.length == 0}
        <AnimatedCheck color="green" />
      {/if}
    </div>
  </form>
</div>
