<script lang="ts">
  import { LogIn } from '@lucide/svelte/icons';
  import { SignInButton } from 'svelte-clerk';
  import { enhance } from '$app/forms';
  import { page } from '$app/state';
  import AnimatedDots from '$lib/components/animated_dots.svelte';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';

  let submitting = $state(false);
  const header = $derived(headerFromStatus(page.status));

  function headerFromStatus(status: number): string {
    if (status == 401 || status == 403 || status == 200) {
      return 'Access Denied';
    } else if (status == 404) {
      return 'Resource Not Found';
    } else if (status == 500) {
      return 'Internal Error';
    } else {
      return `${status} Error`;
    }
  }
</script>

<svelte:head>
  <title>{header} · Oslo Roller Derby</title>
</svelte:head>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>{header}</CrumbPage>
</Crumb>

<h1 class="text-2xl font-semibold">{header}</h1>
{#if page.status == 401}
  <div>Please sign in to access this page.</div>
  <SignInButton class="flex justify-center items-center gap-2 w-36 text-sm px-2 button-primary">
    <LogIn size={20} />
    <span class="font-semibold">Sign in</span>
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
    <button type="submit" class="flex justify-center items-center w-36 text-sm px-2 button-primary" disabled={submitting}>
      {#if submitting}
        <AnimatedDots />
      {:else}
        <span class="font-semibold">Request access</span>
      {/if}
    </button>
  </form>
{:else if page.status == 200}
  <!-- Specific case where a 200 comes back from the access request made after the user gets an unauthorized access error. -->
  <div>Your request has been submitted! Note that approval requires manual review before it is granted.</div>
{:else}
  <div>{page.error?.message}</div>
{/if}
