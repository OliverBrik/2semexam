
<!-- Her vises det fra forsiden -->

<script setup>
// RouterLink is available globally via vue-router; no script logic needed here
</script>

<template>
  <header
    class="relative min-h-96 w-screen bg-cover bg-center overflow-x-hidden"
    style="background-image: url('/src/assets/hero.gif')"
  >
    <!-- Blå overlay -->
    <div class="absolute w-full h-full bg-primary-base"></div>
    <!-- Content -->
    <div class="relative z-10 grid grid-cols-12 gap-4 px-8 pt-30 pb-16 w-full">
      <div class="col-start-2 col-end-10 flex flex-col">
      <p class="text-sm font-semibold uppercase text-white/80">Velkommen</p>
      <h1 class="mt-2 text-4xl font-bold text-white sm:text-5xl">Business DE-DK</h1>
      <p class="mt-4 max-w-2xl text-lg text-white/90">
        Vi skaber stærke forbindelser mellem virksomheder i grænseregionen for at fremme vækst, samarbejde og nye muligheder.
      </p>
      <div class="mt-8 flex flex-wrap gap-4">
        <RouterLink
          to="/nyheder"
          class="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-slate-100"
        >
          Nyheder
        </RouterLink>
        <button
          class="rounded-lg border border-white bg-transparent px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          type="button"
        >
          Jobopslag
        </button>
      </div>
      </div>
    </div>
  </header>
</template>
