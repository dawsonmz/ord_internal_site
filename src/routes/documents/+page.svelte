<script lang="ts">
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import PageLink from '$lib/components/page_link.svelte';
  import PageLinkGroup from '$lib/components/page_link_group.svelte';
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Document Links</CrumbPage>
</Crumb>

<div class="flex max-sm:flex-col max-sm:gap-6">
  <PageLinkGroup header="Team Links" width={360}>
    <PageLink url="https://docs.google.com/spreadsheets/d/10N8UfN49Ty-Sb5VWHOEYWSn1vi0sk5eRWGjpfPJJwCc/edit?usp=sharing" external width={260}>
      {#snippet text()}
        A Team Travel Document
      {/snippet}
      {#snippet description()}
        Google Sheets document used for coordinating travel and accommodation for A Team away games.
      {/snippet}
    </PageLink>
    <PageLink url="https://docs.google.com/spreadsheets/d/1-O3bYEzgagenXJTwTNgHYX1YdaOwN_W1ey4WlZO0eTY/edit?usp=sharing" external width={260}>
      {#snippet text()}
        B Team Travel Document
      {/snippet}
      {#snippet description()}
        Google Sheets document used for coordinating travel and accommodation for B Team away games.
      {/snippet}
    </PageLink>
    <PageLink url="https://drive.google.com/drive/folders/1W2RgC0UHlUueEEdfAWvKJmj4HKRobpEc?usp=sharing" external width={260}>
      {#snippet text()}
        Player Photos
      {/snippet}
      {#snippet description()}
        Google Drive folder with skater photos used for roster social media posts before games.
      {/snippet}
    </PageLink>
  </PageLinkGroup>

  <PageLinkGroup header="Club Links" width={360}>
    <PageLink url="https://docs.google.com/document/d/1Ds_PQc3xQrRm0iSiTuy25AaaxztOrTchawE_D8KSvX8/edit?usp=sharing" external width={260}>
      {#snippet text()}
        Committee Overview
      {/snippet}
      {#snippet description()}
        Google Document describing the different ORD committees and their members.
      {/snippet}
    </PageLink>
    <PageLink url="https://docs.google.com/document/d/1YstTLuXFQ_56Bh-uvhLUlzKCYV5WJ3sSMQeAglegX2k/edit?usp=sharing" external width={260}>
      {#snippet text()}
        Scholarship Fund
      {/snippet}
      {#snippet description()}
        Google Document detailing the application process for the ORD scholarship fund.
      {/snippet}
    </PageLink>
    <PageLink url="https://docs.google.com/document/d/1TlCPurCfia8CNF9NxlmExKkTxRPnRt3PWYInsBlRkIk/edit?usp=sharing" external width={260}>
      {#snippet text()}
        Code of Conduct
      {/snippet}
      {#snippet description()}
        The ORD code of conduct approved in 2024 which is shared with visiting teams and officials.
      {/snippet}
    </PageLink>
  </PageLinkGroup>
</div>
