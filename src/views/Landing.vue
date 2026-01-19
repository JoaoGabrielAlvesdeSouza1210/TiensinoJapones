<template>
  <section>
    <header class="hero min-h-[60vh] bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-3xl">
          <h1 class="text-5xl font-bold">Aprenda Japonês com a Tie 先生</h1>
          <p class="py-6 text-lg text-base-content/80">Aulas personalizadas online e presenciais, foco em conversação e leitura. Método prático e divertido para todos os níveis.</p>
          <div class="flex gap-4 justify-center">
            <a class="btn btn-primary btn-lg">Agende uma aula</a>
            <a class="btn btn-outline btn-lg">Ver planos</a>
          </div>
        </div>
      </div>
    </header>

    <div class="py-12 bg-base-100">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card bg-neutral text-neutral-content p-6">
            <h3 class="text-xl font-semibold">Aulas Individuais</h3>
            <p class="mt-2">Plano sob medida com foco nas suas necessidades e objetivos.</p>
          </div>
          <div class="card bg-neutral text-neutral-content p-6">
            <h3 class="text-xl font-semibold">Acompanhamento das tarefas</h3>
            <p class="mt-2">Material e ajuda para você.</p>
          </div>
          <div class="card bg-neutral text-neutral-content p-6">
            <h3 class="text-xl font-semibold">Conversação</h3>
            <p class="mt-2">Prática orientada para ganhar fluência desde as primeiras aulas.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="py-12">
      <div class="container mx-auto px-6">
        <h2 class="text-2xl font-bold text-center mb-6">Como funcionam as aulas</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="shadow-lg p-6 rounded-lg">
            <p class="italic">As aulas são realizadas com o Zoom para você poder escrever na tela</p>
            <p class="mt-4 font-semibold">Ferramenta de stream</p>
          </div>
          <div class="shadow-lg p-6 rounded-lg">
            <p class="italic"> Explicações sobre a cultura japonesa</p>
            <p class="mt-4 font-semibold">Explicações dadas por uma descendente</p>
          </div>
          <div class="shadow-lg p-6 rounded-lg">
            <p class="italic">Criação de material personalizado de suporte</p>
            <p class="mt-4 font-semibold">Materias feitos à mão para suprir as necessidades</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Landing only uses layout's Header/Footer
</script>

<style scoped></style>
