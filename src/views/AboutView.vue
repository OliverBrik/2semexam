<script setup>
const formspreeAction = 'https://formspree.io/f/your-form-id'

const employees = [
  {
    name: 'Dustin ettermann',
    role: 'Rolle',
    description: 'netudvikler',
    phone: '+45 22 17 79 60',
    email: 'kontakt@businessregion.dk',
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Dustin ettermann',
    role: 'Rolle',
    description: 'arbejdsmarked',
    phone: '+45 22 17 79 61',
    email: 'kontakt@businessregion.dk',
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Dustin ettermann',
    role: 'Rolle',
    description: 'lokal udvikling',
    phone: '+45 22 17 79 62',
    email: 'kontakt@businessregion.dk',
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Dustin ettermann',
    role: 'Rolle',
    description: 'lokal udvikling',
    phone: '+45 22 17 79 63',
    email: 'kontakt@businessregion.dk',
    image:
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=900&q=80',
  },
]
</script>

<template>
  <main class="bg-[#f3f5f8] text-primary-darkest">
    <!-- Hero-sektion: kort intro og baggrundsbillede til siden -->
    <section class="relative overflow-hidden bg-primary-darkest">
      <div
        class="absolute inset-0 bg-cover bg-center opacity-45"
        style="background-image: url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80')"
      ></div>
      <div class="absolute inset-0 bg-gradient-to-r from-primary-darkest via-primary-darkest/80 to-primary-darkest/40"></div>

      <div class="relative mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div class="col-span-12 flex flex-col justify-end text-neutral-light lg:col-span-8 lg:col-start-2">
          <p class="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-light/70">Business Region</p>
          <h1 class="mt-4 max-w-3xl text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">Hvem er vi?</h1>
          <p class="mt-5 max-w-2xl text-sm leading-7 text-neutral-light/85 sm:text-base">
            Business DE-DK forbinder virksomheder, organisationer og mennesker på tværs af grænseregionen.
            Vi skaber netværk, indsigter og samarbejder, der gør det lettere at udvikle sig, finde hinanden og
            skabe værdi sammen.
          </p>
        </div>
      </div>
    </section>

    <!-- Kontakt og vision: formular til venstre og tekst om siden til højre -->
    <section class="mx-auto mt-10 max-w-7xl px-4 pb-10 sm:px-6 lg:mt-14 lg:px-8">
      <div class="grid grid-cols-12 gap-6">
        <aside class="col-span-12 rounded-lg bg-[#6f7e92] p-5 text-neutral-light shadow-2xl lg:col-span-4 lg:col-start-2">
          <h2 class="text-center text-2xl font-light">Kontakt os</h2>

          <form class="mt-5 space-y-4" :action="formspreeAction" method="POST">
            <div class="space-y-2">
              <label class="text-sm font-light" for="about-name">Navn</label>
              <input
                id="about-name"
                name="name"
                type="text"
                placeholder="Dit navn"
                class="w-full border-b border-neutral-light/50 bg-transparent px-0 py-2 text-sm text-neutral-light placeholder:text-neutral-light/55 focus:border-neutral-light focus:outline-none"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-light" for="about-email">Email</label>
              <input
                id="about-email"
                name="email"
                type="email"
                placeholder="Din email"
                class="w-full border-b border-neutral-light/50 bg-transparent px-0 py-2 text-sm text-neutral-light placeholder:text-neutral-light/55 focus:border-neutral-light focus:outline-none"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-light" for="about-message">Besked</label>
              <textarea
                id="about-message"
                name="message"
                rows="7"
                placeholder="Skriv din besked her"
                class="w-full resize-none border border-neutral-light/45 bg-[#5d6d82] px-3 py-2 text-sm text-neutral-light placeholder:text-neutral-light/55 focus:border-neutral-light focus:outline-none"
              ></textarea>
            </div>

            <div class="flex flex-wrap gap-4 pt-1 text-sm font-light">
              <label class="flex items-center gap-2">
                <input type="radio" name="type" value="virksomhed" class="accent-primary-darkest" />
                Virksomhed
              </label>
              <label class="flex items-center gap-2">
                <input type="radio" name="type" value="privat" class="accent-primary-darkest" />
                Privat
              </label>
            </div>

            <button
              type="submit"
              class="mt-2 w-full bg-neutral-light px-4 py-2 text-sm font-medium text-primary-darkest transition-colors duration-300 hover:bg-primary-light hover:text-neutral-light"
            >
              Send besked
            </button>
          </form>
        </aside>

        <article class="col-span-12 bg-white px-6 py-8 shadow-sm lg:col-span-6 lg:col-start-6 lg:mt-10 lg:px-10 lg:py-12">
          <h2 class="mt-2 text-3xl font-semibold tracking-tight text-primary-darkest sm:text-4xl">VORES VISION</h2>
          <div class="mt-6 space-y-5 text-base leading-7 text-primary-darkest/90">
            <p>
              Hos Business DE-DK er vores vision at skabe en stærk og fremtidssikret forbindelse mellem Danmark og
              Tyskland, hvor virksomheder, talenter og ideer kan udvikle sig på tværs af grænsen. Vi tror på, at
              samarbejde og vidensdeling er nøglen til innovation, vækst og bæredygtig udvikling i regionen.
            </p>
            <p>
              Gennem netværk, partnerskaber og fælles initiativer arbejder vi for at styrke erhvervslivet og skabe nye
              muligheder for både virksomheder og mennesker. Vores mål er at være en drivkraft for international
              samarbejde og bidrage til en region, hvor udvikling, innovation og fællesskab går hånd i hånd.
            </p>
          </div>
        </article>
      </div>
    </section>

    <!-- Medarbejdere: oversigt over teamet i kort med billede og kontaktinfo -->
    <section class="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div class="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 class="mt-2 text-3xl font-semibold text-primary-darkest">MEDARBEJDERE</h2>
        </div>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="employee in employees"
          :key="employee.name + employee.phone"
          class="overflow-hidden bg-primary-darkest text-neutral-light shadow-lg transition-transform duration-300 hover:-translate-y-1"
        >
          <img :src="employee.image" :alt="employee.name" class="h-52 w-full object-cover object-center" />
          <div class="p-4 text-center">
            <h3 class="text-base font-semibold leading-6">{{ employee.name }}</h3>
            <p class="mt-1 text-sm text-neutral-light/85">{{ employee.role }}</p>
            <p class="mt-3 text-xs uppercase tracking-[0.18em] text-neutral-light/55">{{ employee.description }}</p>
            <p class="mt-3 text-xs text-neutral-light/85">{{ employee.phone }}</p>
            <p class="text-xs text-neutral-light/70">{{ employee.email }}</p>
            <a
              href="/kontakt"
              class="mt-4 inline-flex items-center justify-center bg-neutral-light px-4 py-2 text-xs font-medium text-primary-darkest transition-colors duration-300 hover:bg-primary-light hover:text-neutral-light"
            >
              LinkedIn
            </a>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
