<template>
  <main class="grid w-full grid-cols-12 gap-4 px-8 py-12 text-primary-darkest">
    <RouterLink
      to="/"
      class="col-span-12 inline-flex items-center text-sm font-medium text-primary-darkest transition-colors hover:text-primary-base lg:col-start-2 lg:col-end-12"
    >
      ← {{ $t('nav.home') }}
    </RouterLink>

    <article class="col-span-12 mt-6 overflow-hidden bg-white shadow-sm ring-1 ring-black/5 lg:col-start-2 lg:col-end-12">
      <header class="border-b border-slate-100 px-6 py-6 md:px-8">
        <p class="text-sm font-medium uppercase tracking-[0.14em] text-primary-base">{{ $t('footer.legalInfo') }}</p>
        <h1 class="mt-2 text-3xl font-light text-primary-darkest sm:text-4xl">
          Vores behandling af dine personoplysninger
        </h1>
      </header>

      <div class="px-6 py-6 md:px-8">
        <div class="space-y-6 text-base leading-7 text-slate-700">
          <section class="space-y-3">
            <p>
              Oplysningerne indsamles, behandles og videregives til brug for udførelse af foreningens aktiviteter af enhver art. Herunder gælder medlemsadministration, udsendelse af nyhedsbreve, indkaldelse til generalforsamling og medlemsaktiviteter, fakturering mv. Foreningen opbevarer kun dine oplysninger, så længe det er nødvendigt. Ved udmeldelse sørger foreningen for at slette dine oplysninger alle de registrerede steder.
            </p>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-slate-900">Formål: Medlemsadministration</h2>
            <p>Indmeldelse, udmeldelse, markedsføring af medlemmer på hjemmesiden og fakturering af medlemskontingent.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Kategorier af personoplysninger</h3>
            <p>Almindelige personoplysninger, f.eks. virksomhedsnavn, kontaktperson, adresse, e-mail, telefonnummer, CVR-numre, antal ansatte, firmalogo, Facebook-side, LinkedIn og hjemmeside.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Kilder</h3>
            <p>Direkte fra dig ved indmeldelse og fra offentligt tilgængelige kilder, f.eks. telefonregistre og hjemmesider.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Behandlingsgrundlag/hjemmel</h3>
            <p>Databeskyttelsesforordningen artikel 6, stk. 1, litra f om legitime interesser, jf. § 6 i Databeskyttelsesloven. Hvis det er nødvendigt for at vi kan overholde en retlig forpligtelse, f.eks. i henhold til bogføringsloven. Nødvendig for forfølgelsen af Tønder Erhvervsråds legitime interesse i at markedsføre vores tjenester til vores medlemmer.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Modtagere</h3>
            <p>Til Tønder kommune samt øvrige samarbejdspartnere og til leverandører vi samarbejder med, f.eks. Webitall.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Opbevaring</h3>
            <p>Vi vil opbevare personoplysninger så længe det er nødvendigt til de formål, der er nævnt. I forbindelse med medlemskontingent og salg af tjenester vil vi opbevare dine personoplysninger i op til 5 år efter afslutning af forholdet, jf. bogføringsloven, medmindre der er specielle grunde til at opbevare informationerne i en længere periode. Ved udmeldelse slettes personoplysningerne med det samme, men opbevares aflåst i minimum 5 år af hensyn til bogføringsloven.</p>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-slate-900">Formål: Markedsføring</h2>
            <p>Udsendelse af nyhedsbreve, indkaldelse til generalforsamling, arrangementsinvitationer, indstilling til erhvervsprisen og markedsføring af vores erhvervsservices.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Kategorier af personoplysninger</h3>
            <p>Almindelige personoplysninger, f.eks. virksomhedsnavn, kontaktperson, adresse, e-mail, telefonnummer og CVR-numre.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Kilder</h3>
            <p>Direkte fra dig ved tilmelding af arrangement, fra offentligt tilgængelige kilder samt fra Nemtilmeld, vores bookingsystem til arrangementer.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Behandlingsgrundlag/hjemmel</h3>
            <p>Databeskyttelsesforordningen artikel 6, stk. 1, litra f om legitime interesser, jf. § 6 i Databeskyttelsesloven. Nødvendig for forfølgelsen af Tønder Erhvervsråds legitime interesse i at sende dig nyhedsbreve, arrangementinvitationer og i øvrigt kunne tilbyde dig en effektiv erhvervsservice. Udtrykkeligt samtykke for modtagelse af nyhedsbreve.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Modtagere</h3>
            <p>Til leverandører vi samarbejder med for at støtte vores virksomhed, f.eks. Nemtilmeld.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Opbevaring</h3>
            <p>Vi vil opbevare personoplysninger så længe det er nødvendigt til de formål, der er nævnt, eller så længe et afgivet samtykke til at modtage markedsføring ikke er trukket tilbage.</p>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-slate-900">Formål: Erhvervsservices</h2>
            <p>Virksomhedsbesøg, virksomhedskontakt, iværksættervejledning, kompetenceudvikling, kvalificeret arbejdskraft, væksthjulsforløb og registrering i ESCRM.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Kategorier af personoplysninger</h3>
            <p>Almindelige personoplysninger, f.eks. virksomhedsnavn, kontaktperson, adresse, e-mail, telefonnummer, CVR-numre, referater og relevante dokumenter.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Kilder</h3>
            <p>Direkte fra dig ved tilmelding af arrangement, fra offentligt tilgængelige kilder og fra Nemtilmeld.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Behandlingsgrundlag/hjemmel</h3>
            <p>Databeskyttelsesforordningen artikel 6, stk. 1, litra f om legitime interesser, jf. § 6 i Databeskyttelsesloven. Nødvendig for forfølgelsen af Tønder Erhvervsråds legitime interesse i at tilbyde dig en effektiv erhvervsservice. Registrering i CRM-system til opfyldelse af KPI'er. Udtrykkeligt samtykke.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Modtagere</h3>
            <p>Til leverandører vi samarbejder med, f.eks. Væksthus Syddanmark, TOHA, Mentorkorpset og NN-markedsdata.</p>
            <h3 class="text-sm font-semibold uppercase tracking-[0.14em] text-slate-600">Opbevaring</h3>
            <p>Vi vil opbevare personoplysninger så længe det er nødvendigt til de formål, der er nævnt, og så længe et afgivet samtykke ikke er trukket tilbage.</p>
          </section>

          <section class="space-y-3 border-t border-slate-100 pt-6">
            <h2 class="text-lg font-semibold text-slate-900">Tidsfrister for sletning/opbevaring</h2>
            <p>Vi stræber efter at slette eller anonymisere personoplysninger, så snart de ikke har nogen relevans. Dog opbevarer vi dem altid i minimum 5 år af hensyn til bogføringsloven. Hvis du ønsker at få slettet dine oplysninger i vores database, skal du henvende dig til foreningen på erhverv@toender.dk. Du skal dog være opmærksom på, at du ikke længere kan være medlem af foreningen.</p>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-slate-900">Dine rettigheder efter persondataforordningen</h2>
            <p>Du har blandt andet ret til indsigt, berigtigelse, sletning, indsigelse mod direkte markedsføring og dataportabilitet. Alle ovenstående rettigheder håndteres manuelt ved henvendelse til vores persondataansvarlige.</p>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-slate-900">Oplysninger, som vi videregiver</h2>
            <p>Videregivelse sker i det omfang, det er nødvendigt for foreningens aktiviteter. Firmanavn, adresse, e-mail, telefonnummer, CVR-nummer, antal ansatte og kontaktperson indgår i medlemslisten. Oplysningerne videregives kun til tredjepart i det omfang, det er nødvendigt for at varetage foreningens aktiviteter.</p>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-slate-900">Informationssikkerhed</h2>
            <p>Vi arbejder hårdt for at beskytte foreningen og dens medlemmer mod uautoriseret adgang, ændring, offentliggørelse eller ødelæggelse af personoplysninger. Vi anvender blandt andet antivirus, backup, databehandleraftaler, tavshedserklæringer og opbevaring i CRM-system med individuelle koder.</p>
          </section>

          <section class="space-y-3">
            <h2 class="text-lg font-semibold text-slate-900">Ændringer</h2>
            <p>Vores persondatapolitik kan ændres fra tid til anden. Eventuelle ændringer angives på denne side.</p>
          </section>

          <section class="space-y-3 border-t border-slate-100 pt-6">
            <h2 class="text-lg font-semibold text-slate-900">Ret til at klage til Datatilsynet</h2>
            <p>Du kan klage over behandling af personoplysninger til Datatilsynet, Borgergade 28, 1300 København K, tlf. 33 19 32 00, eller via e-mail: dt@datatilsynet.dk.</p>
          </section>
        </div>
      </div>
    </article>
  </main>
</template>