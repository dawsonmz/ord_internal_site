<script lang="ts">
  import { LogIn } from '@lucide/svelte/icons';
  import { SignInButton } from 'svelte-clerk';
  import { enhance } from '$app/forms';
  import { page } from '$app/state';
  import AnimatedDots from '$lib/components/animated_dots.svelte';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import Button from '$lib/components/button.svelte';

  let submitting = $state(false);
  const header = $derived(page.status == 401 || page.status == 403 || page.status == 200 ? 'Access Denied' : `${page.status} Error`);
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>{header}</CrumbPage>
</Crumb>

{#if page.status == 401}
  <SignInButton class="flex items-center gap-2 link-hover w-max">
    <LogIn size={24} />
    <div>Please sign in to access this page.</div>
  </SignInButton>
{:else if page.status == 403}
  <div>Your user account does not have access to this page.</div>
  <form
      method="POST"
      action="?/requestaccess"
      use:enhance={
        () => {
          submitting = true;
          return async ({ update }) => {
            await update();
            submitting = false;
          };
        }
      }
  >
    <input type="hidden" name="context" value={page.route.id} />
    <div class="flex gap-2">
      <Button baseClasses="flex justify-center items-center w-36 h-9" disabled={submitting}>
        {#if submitting}
          <AnimatedDots />
        {:else}
          <span class="font-semibold">Request access</span>
        {/if}
      </Button>
    </div>
  </form>
{:else if page.status == 200}
  <!-- Specific case where a 200 comes back from the access request made after the user gets an unauthorized access error. -->
  <div>Your request has been submitted! Note that approval requires manual review before it is granted.</div>
{:else}
  <div>{page.error?.message}</div>
{/if}
