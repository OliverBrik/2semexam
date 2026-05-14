<script setup>
import { employees } from '../data/employees'

const formspreeAction = 'https://formspree.io/f/your-form-id'
</script>

<template>
  <main class="p-0! bg-[#f3f5f8] text-primary-darkest">
    <section
      class="relative min-h-156 w-screen overflow-hidden bg-primary-darkest"
      style="margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw);"
    >
      <div
        class="absolute inset-0 bg-cover bg-center opacity-45"
        style="background-image: url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80')"
      ></div>
      <div class="absolute inset-0 bg-linear-to-r from-primary-darkest via-primary-darkest/80 to-primary-darkest/35"></div>

      <div class="absolute inset-0 z-10 flex items-end">
        <div class="grid w-full grid-cols-12 gap-4 px-8 pb-16 lg:pb-20">
          <div class="col-span-12 flex flex-col justify-end text-neutral-light lg:col-span-8 lg:col-start-2">
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-light/70">Business Region</p>
            <h1 class="mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">Kontakt os</h1>
            <p class="mt-5 max-w-2xl text-sm leading-7 text-neutral-light/85 sm:text-base">
              Har du spørgsmål, ønsker du at samarbejde, eller vil du høre mere om vores netværk, så er du velkommen
              til at skrive til os her.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="mt-10 w-full px-8 pb-10 lg:mt-14">
      <div class="grid grid-cols-12 gap-8 xl:gap-12">
        <aside class="col-span-12 bg-[#6f7e92] p-5 text-neutral-light shadow-2xl lg:col-span-8 lg:col-start-3 lg:p-7 xl:col-span-8 xl:col-start-3">
          <h2 class="text-center text-3xl font-light">Kontakt os</h2>
          <p class="mx-auto mt-3 max-w-2xl text-center text-sm leading-6 text-neutral-light/85">
            Skriv til os direkte her, hvis du vil have fat i os hurtigt. Vi vender tilbage så snart vi kan.
          </p>

          <form class="mt-8 space-y-5" :action="formspreeAction" method="POST">
            <div class="grid gap-5 md:grid-cols-2">
              <div class="space-y-2">
                <label class="text-sm font-light" for="kontakt-navn">Navn</label>
                <input
                  id="kontakt-navn"
                  name="name"
                  type="text"
                  placeholder="Dit navn"
                  class="w-full border-b border-neutral-light/50 bg-transparent px-0 py-2 text-sm text-neutral-light placeholder:text-neutral-light/55 focus:border-neutral-light focus:outline-none"
                />
              </div>

              <div class="space-y-2">
                <label class="text-sm font-light" for="kontakt-telefon">Telefon</label>
                <input
                  id="kontakt-telefon"
                  name="phone"
                  type="tel"
                  placeholder="Dit telefonnummer"
                  class="w-full border-b border-neutral-light/50 bg-transparent px-0 py-2 text-sm text-neutral-light placeholder:text-neutral-light/55 focus:border-neutral-light focus:outline-none"
                />
              </div>
            </div>

            <div class="space-y-2">
              <label class="text-sm font-light" for="kontakt-email">Email</label>
              <input
                id="kontakt-email"
                name="email"
                type="email"
                placeholder="Din email"
                class="w-full border-b border-neutral-light/50 bg-transparent px-0 py-2 text-sm text-neutral-light placeholder:text-neutral-light/55 focus:border-neutral-light focus:outline-none"
              />
            </div>

            <div class="space-y-2">
              <label class="text-sm font-light" for="kontakt-besked">Besked</label>
              <textarea
                id="kontakt-besked"
                name="message"
                rows="9"
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
      </div>
    </section>

    <section class="w-full px-8 pb-16">
      <div class="grid grid-cols-12 gap-5">
        <div class="col-span-12 mb-1 lg:col-start-2 lg:col-end-12">
          <div class="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 class="mt-2 text-3xl font-semibold text-primary-darkest">MEDARBEJDERE</h2>
            </div>
          </div>
        </div>

        <div class="col-span-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 lg:col-start-2 lg:col-end-12">
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
      </div>
    </section>
  </main>
</template>
