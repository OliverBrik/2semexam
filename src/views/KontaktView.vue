<template>
  <main class="max-w-2xl mx-auto p-8">
    <h1 class="text-3xl font-light mb-4 text-primary-darkest">Kontakt os</h1>
    <div class="space-y-2 text-primary-dark">
      <p><span class="font-semibold">Adresse:</span> Eksempelgade 1, 1234 København</p>
      <p><span class="font-semibold">Telefon:</span> +45 12 34 56 78</p>
      <p><span class="font-semibold">Email:</span> info@businessregion.dk</p>
    </div>
    <div class="mt-8">
      <h2 class="text-xl font-light mb-2">Kontaktformular</h2>
      <form class="space-y-4">
        <input type="text" placeholder="Navn" class="w-full border border-primary-light rounded px-3 py-2" />
        <input type="email" placeholder="Email" class="w-full border border-primary-light rounded px-3 py-2" />
        <textarea placeholder="Besked" class="w-full border border-primary-light rounded px-3 py-2"></textarea>
        <button type="submit" class="bg-primary-darkest text-neutral-light px-6 py-2 rounded hover:bg-primary-light hover:text-primary-darkest transition-colors duration-300">Send</button>
      </form>
    </div>
  </main>
</template>
