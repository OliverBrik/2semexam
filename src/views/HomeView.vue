<script setup>
</script>

<template>
  <header
    class="relative min-h-96 w-screen bg-cover bg-center overflow-x-hidden"
    style="background-image: url('/src/assets/hero.gif')"
  >
    <!-- Blå overlay -->
    <div class="absolute inset-0 w-full h-full bg-primary-base"></div>
    <!-- Content -->
    <div class="relative z-10 flex flex-col px-6 pt-4 pb-16 w-full max-w-5xl mx-auto">
      <p class="text-sm font-semibold uppercase tracking-widest text-white/80">Velkommen</p>
      <h1 class="mt-2 text-4xl font-bold text-white sm:text-5xl">Business DE-DK</h1>
      <p class="mt-4 max-w-2xl text-lg text-white/90">
        Vi skaber stærke forbindelser mellem virksomheder i grænseregionen for at fremme vækst, samarbejde og nye muligheder.
      </p>
      <div class="mt-8 flex flex-wrap gap-4">
        <button
          class="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-slate-100"
          type="button"
        >
          Nyheder
        </button>
        <button
          class="rounded-lg border border-white bg-transparent px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          type="button"
        >
          Jobopslag
        </button>
      </div>
    </div>
  </header>
</template>
