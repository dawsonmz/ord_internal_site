<script lang="ts">
  import { Tabs } from '@skeletonlabs/skeleton-svelte';
  import { Crumb, CrumbHome, CrumbPage, CrumbSeparator } from '$lib/components/breadcrumb/index';
  import TabControl from '$lib/components/tab_control.svelte';

  let tabState = $state('Norsk');
</script>

<Crumb>
  <CrumbHome />
  <CrumbSeparator />
  <CrumbPage>Reporting Incidents</CrumbPage>
</Crumb>

<Tabs value={tabState} onValueChange={e => tabState = e.value }>
  <Tabs.List class="mb-4">
    <TabControl value='Norsk' isSelected={tabState == 'Norsk'} />
    <TabControl value='English' isSelected={tabState == 'English'} />
    <Tabs.Indicator class="border-y-[1px] w-[90px]" />
  </Tabs.List>
  <Tabs.Content value='Norsk'>
    <div class="flex flex-col gap-3">
      <div class="font-semibold text-xl">
        Varsling i Oslo Roller Derby
      </div>

      <div class="text-lg subheading">
        Sist oppdatert: 20.3.2026
      </div>
      <div>
        Oslo Roller Derby (ORD) ønsker å være en trygg arena for alle våre medlemmer. Det er viktig
        at om du har opplevd eller vært vitne til hendelser, handlinger eller oppførsel som du
        tenker bryter med våre regler, at du sier i fra om dette. I ORD tar vi alle varsler om
        kritikkverdige forhold på alvor.
      </div>

      <div>
        <span class="font-bold">Tillitspersoner</span>: Silje Ebbesen og Angelique Rein
      </div>
      <div>
        Varsle her:
        <a class="link underline" href="https://portal.mittvarsel.no/v/nif" target="_blank">
          https://portal.mittvarsel.no/v/nif
        </a>
      </div>

      <div class="font-bold">
        Hva kan du varsle om?
      </div>
      <div>
        Du kan si ifra om hendelser eller handlinger som du selv har opplevd, har oppdaget, har
        direkte kjennskap til, eller har hørt om fra andre. Dette gjelder hendelser under
        arrangementer i regi av klubben, hendelser knyttet til andre medlemmer i klubben, og/eller
        hendelser som påvirker din mulighet til å delta fullt i klubbens aktiviteter.
      </div>
      <div>
        Eksempler på temaer du kan si ifra om er underslag av penger, trakassering fra trener,
        mobbing fra andre utøvere, juksing i konkurranser, rasistiske utrop eller diskriminerende,
        upassende, skadelig eller uønsket oppførsel med mer.
      </div>
      <div>
        Det skal være en lav terskel for å si fra om brudd på idrettens regler og retningslinjer.
        Du kan lese mer om temaer du kan varsle om her:
        <a class="link underline" href="https://www.idrettsforbundet.no/tema/varsling/mer-om-tema/" target="_blank">
          https://www.idrettsforbundet.no/tema/varsling/mer-om-tema/
        </a>
      </div>

      <div class="font-bold">
        Hvor/til hvem sendes varselet?
      </div>
      <div>
        Vi mottar alle varslingssaker gjennom løsningen MittVarsel.
      </div>
      <div>
        Når et varsel sendes inn er det våre administratorer og tillitspersoner som tar imot
        varselet. De nåværende tillitspersonene er oppgitt i de siste dokumentene fra årsmøtet.
        Dersom du har spørsmål om varslingsaker eller om du er usikker på om det du sitter inne med
        faktisk er et varsel kan du kontakte tillitspersoner direkte så vil du få hjelp på vegen
        videre. Du kan kontakte tillitspersoner ved å sende en melding til begge to i Spond, hvor
        vi vil avtale eventuell videre oppfølging.
      </div>
      <div>
        Tillitspersonenes mandat er å være tilgjengelige som mekler dersom noen medlemmer føler at
        det er konflikter eller uenigheter de vil ta opp med andre medlemmer eller
        komiteer/grupper, og ønsker en objektiv part med i samtalen. Tillitspersonene har
        taushetsplikt. Det er medlemmene selv som må ta kontakt med tillitspersonen.
      </div>
      <ul class="text-list">
        <li>
          Tillitspersonen skal tilby seg å ha en samtale med begge parter i konflikten/uenigheten.
        </li>
        <li>
          Det er et mål at initiativtager og motpart selv skal foreslå en løsning av konflikten.
        </li>
      </ul>
      <div>
        Dersom varselet medfører behov for tiltak utover de ovennevnte punktene, vil saken tas opp
        med styret for videre behandling. Dette gjelder også dersom varselet omhandler
        tillitspersonene, hvor saken da kan tas direkte til styreleder.
      </div>

      <div class="font-bold">
        Varsle med navn
      </div>
      <div>
        Du kan varsle med navn og bruke egen epost-adresse. Når vi mottar et varsel, vil vi
        behandle det fortrolig. Fortrolighet innebærer i denne sammenheng at identiteten til den
        som sier ifra og den/de det eventuelt varsles om, ikke skal gjøres kjent for flere enn det
        som er nødvendig for å behandle saken.
      </div>
      
      <div class="font-bold">
        Varsle anonymt
      </div>
      <div>
        Du kan velge å være anonym og varsle uten navn. Du vil da få tildelt et brukernavn og
        passord på SMS eller epost slik at du på et senere tidspunkt kan logge deg på for å
        kommunisere med saksbehandler. Om du velger å være anonym i en varslingssak kan det bety at
        saksbehandlere ikke kan gå videre med saken overfor den det er varslet om. Dette er på
        grunn av at det kan være vanskeligere å opplyse saken eller at saksbehandlerne velger å
        ikke gå videre for å sikre varslers anonymitet. Spør gjerne din saksbehandler om råd og mer
        informasjon.
      </div>

      <div class="font-bold">
        Hva skjer etter at du har varslet?
      </div>
      <div>
        MittVarsel er et digitalt system for behandling av varsler. Systemet er kryptert og sikrer
        at all informasjon som sendes inn oppbevares riktig og i henhold til krav om lagring av
        personsensitiv informasjon.
      </div>
      <div>
        Etter at du har sendt inn et varsel, vil saken bli tildelt tillitspersonene som er
        saksbehandlere for varslingssaker. Du har mulighet til å kommunisere med dem gjennom hele
        behandlingen. Om du ikke hører noe, ta gjerne kontakt med tillitspersoner for å være sikker
        på at varselet er mottatt.
      </div>

      <div class="font-bold">
        Saksgang
      </div>
      <ol class="text-list">
        <li>
          Mottak av varsel: fortrinnsvis via portal, evt. andre kanaler.
        </li>
        <li>
          Avklaring: tillitspersoner skal avklare om saken som er meldt inn er et varsel eller ikke.
        </li>
        <li>
          <div>
            Undersøke/kartlegge: individuelle samtaler med varsler, personen det er varslet om,
            og med andre som har viktig informasjon om det som har skjedd.
          </div>
          <div class="mt-2">
            Samtalene bør alltid gjennomføres i en fast rekkefølge. Først gjennomføres det
            samtale med varsler og/eller utsatt, deretter vitner eller andre som har relevant
            informasjon, for til slutt å snakke med personen det er varslet om. Dette er for å
            sikre at saksbehandlere har full informasjon om hva, hvor og hvem, før de snakker med
            personen det er varslet om.
          </div>
          <div class="font-semibold mt-2">
            Det er viktig at omvarslet får uttale seg om alle handlinger eller hendelser hen er
            anklaget for (kontradiksjon).
          </div>
        </li>
        <li>
          Konkludere. Basert på samtalene og fremkommet informasjon skal det konkluderes hva
          saksbehandlere mener er sannsynlig at har skjedd, og om dette er et regelbrudd. Om
          konklusjonen i saken er at vi mener at handlingen det er varslet om er et regelbrudd er
          neste steg å konkludere på hva som bør være en reaksjon. En slik reaksjon avgjøres av
          klubbens styre. Er handlingen et mer alvorlig brudd på idrettens regler, og det bør gis
          en strengere reaksjon, bør saken sendes videre til NIFs domsutvalg.
        </li>
      </ol>
    </div>
  </Tabs.Content>
  <Tabs.Content value='English'>
    <div class="flex flex-col gap-3">
      <div class="font-semibold text-xl">
        Reporting Incidents in Oslo Roller Derby
      </div>

      <div class="text-lg subheading">
        Last updated: 20.3.2026
      </div>
      <div>
        Oslo Roller Derby (ORD) strives to be a safer space for all our members. It is important
        that if you have experienced or witnessed events, actions or behavior that you think
        violate our rules, that you report this. At ORD, we take all reports of problematic
        conditions seriously.
      </div>

      <div>
        <span class="font-bold">Trust representatives</span>: Silje Ebbesen and Angelique Rein
      </div>
      <div>
        Report here:
        <a class="link underline" href="https://portal.mittvarsel.no/v/nif" target="_blank">
          https://portal.mittvarsel.no/v/nif
        </a>
      </div>
      <div>
        The page is in Norwegian; contact the trust representatives if you need support.
      </div>

      <div class="font-bold">
        What can you report about?
      </div>
      <div>
        You can report about incidents or actions that you yourself have experienced, discovered,
        have direct knowledge about, or have heard about from others. This applies to incidents
        that happened during club events, incidents connected to other club members, and/or
        incidents that affect your ability to participate fully in the club’s activities.
      </div>
      <div>
        Examples of themes you can report about are stealing/embezzlement of money, harassment from
        a trainer, bullying from other members, cheating in competitions, racist remarks or
        discriminating, inappropriate, harmful, or unwanted behavior, among others.
      </div>
      <div>
        Along with Idrettsforbundet, we have aimed to create a low threshold for reporting about
        violations in the sport’s rules and guidelines. You can read more about themes you can
        report about here (in Norwegian):
        <a class="link underline" href="https://www.idrettsforbundet.no/tema/varsling/mer-om-tema/" target="_blank">
          https://www.idrettsforbundet.no/tema/varsling/mer-om-tema/
        </a>
      </div>

      <div class="font-bold">
        Where/to whom is the report sent?
      </div>
      <div>
        We receive all reports and related information through the MittVarsel system.
      </div>
      <div>
        When a report is sent in, our administrators and “tillitspersoner” (trusted representatives
        elected by the league) receive the report. The names of the current representatives are
        listed in the latest documents from ORD’s yearly meeting. If you have questions about
        reporting cases or if you are unsure about whether you should report something, you can
        contact the representatives directly and you will get help on how to proceed. You can
        contact them by sending a message to both in Spond, where we will arrange any further
        follow-ups.
      </div>
      <div>
        The mandate of the elected trust representatives is to be available as an intermediary in
        the case where some members feel that there are conflicts or disagreements they want to
        bring up with other members or committees/groups, and wish to have an objective party along
        in the conversation. The representatives have a duty of confidentiality. Members themselves
        must initiate contact with the representative(s).
      </div>
      <ul class="text-list">
        <li>
          The representative must offer to have a conversation with both parties in the
          conflict/disagreement.
        </li>
        <li>
          It is a goal that the initiative-taker and the person/people they reported about will
          suggest a solution to the conflict.
        </li>
      </ul>
      <div>
        If the report entails a need for measures beyond the above points, the matter will be taken
        up with the board for further consideration. This also applies if the notification concerns
        the trust representatives, in which case the matter can then be taken directly to the
        leader of the board.
      </div>

      <div class="font-bold">
        Report non-anonymously (by name)
      </div>
      <div>
        You can report with your name and use your own email address. When we receive a report, we
        will treat it confidentially. In this context, confidentiality means that the identity of
        the person who reports and the person(s) who may be notified will not be made known to more
        people than is necessary to process the case.
      </div>
      
      <div class="font-bold">
        Report anonymously
      </div>
      <div>
        You can choose to remain anonymous and report without a name. You will then be assigned a
        username and password by SMS or email so that you can log in at a later date to communicate
        with the case officer. If you choose to remain anonymous in a case, it may mean that case
        officers cannot proceed with the case in relation to the person who has been notified. This
        is due to the fact that it may be more difficult to shed light on the case or that the case
        officers choose not to proceed further in order to ensure the anonymity of the reporter.
        Feel free to ask your case officer for advice and more information.
      </div>

      <div class="font-bold">
        What happens after you have reported?
      </div>
      <div>
        MittVarsel is a digital system for processing reports. The system is encrypted and ensures
        that all information submitted is stored correctly and in accordance with requirements for
        the storage of sensitive personal information.
      </div>
      <div>
        After you have submitted a report, the case will be assigned to the trust representatives
        who are the case officers for cases. You have the opportunity to communicate with them
        throughout the process. If you do not hear anything, feel free to contact them to be sure
        that the submission has been received.
      </div>

      <div class="font-bold">
        Procedure
      </div>
      <ol class="text-list">
        <li>
          Receipt of report: preferably via portal, possibly other channels.
        </li>
        <li>
          Clarification: Trust reps will clarify whether the case that has been reported is
          eligible to be handled as a case or not.
        </li>
        <li>
          <div>
            Investigate/map: individual conversations with the reporter, the person who has been
            reported about, and with others who have important information about what has
            happened.
          </div>
          <div class="mt-2">
            The conversations should always be carried out in a fixed order. First, a
            conversation is conducted with the reporter and/or victim, then witnesses or others
            who have relevant information, and finally talking to the person who has been
            reported about. This is to ensure that case officers have full information about
            what, where and whom, before they talk to the person who has been reported about.
          </div>
          <div class="font-semibold mt-2">
            It is important that the person who is reported about is allowed to comment on all
            actions or incidents they are accused of (contradiction).
          </div>
        </li>
        <li>
          Conclude. Based on the conversations and the information provided, it will be concluded
          what the case officers believe is likely to have happened, and whether this is a
          violation of the rules. If the conclusion in the case is that we believe that the
          action that has been reported is a violation of the rules, the next step is to conclude
          on what should be a reaction. Such a reaction is decided by the club's board. If the
          action is a more serious violation of the rules of sport, and a stricter sanction
          should be given, the case should be forwarded to NIF's judicial committee.
        </li>
      </ol>
    </div>
  </Tabs.Content>
</Tabs>
