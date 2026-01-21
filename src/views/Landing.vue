<template>
  <section>
    <!-- Hero Section com imagem da professora -->
    <header class="hero min-h-[80vh] bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10">
      <div class="hero-content flex-col lg:flex-row-reverse gap-12 max-w-7xl px-6">
        <!-- Imagem da professora -->
        <div class="flex-shrink-0 relative">
          <div class="relative">
            <!-- Placeholder com borda decorativa -->
            <div class="avatar">
              <div class="w-64 md:w-80 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 shadow-2xl hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" 
                  alt="Tie Sensei" 
                  class="object-cover"
                />
              </div>
            </div>
            <!-- Elemento decorativo japonês -->
            <div class="absolute -top-4 -right-4 text-6xl opacity-20 pointer-events-none">
              🌸
            </div>
            <div class="absolute -bottom-4 -left-4 text-6xl opacity-20 pointer-events-none">
              ⛩️
            </div>
          </div>
        </div>

        <!-- Conteúdo do Hero -->
        <div class="text-center lg:text-left max-w-2xl">
          <div class="badge badge-primary badge-lg mb-4 gap-2">
            ⭐ Professora Descendente
          </div>
          <h1 class="text-5xl md:text-6xl font-bold leading-tight">
            Aprenda Japonês com a 
            <span class="text-primary">Tie 先生</span>
          </h1>
          <p class="py-6 text-lg md:text-xl text-base-content/80 leading-relaxed">
            Aulas personalizadas online e presenciais, com foco em conversação e leitura. 
            Método <span class="font-semibold text-primary">prático e divertido</span> para todos os níveis.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a class="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-shadow">
              📅 Agende uma Aula Grátis
            </a>
            <a class="btn btn-outline btn-lg gap-2">
              📚 Ver Planos e Preços
            </a>
          </div>
          <!-- Estatísticas rápidas -->
          <div class="flex gap-8 mt-8 justify-center lg:justify-start flex-wrap">
            <div class="text-center">
              <div class="stat-value text-3xl text-primary">5+</div>
              <div class="stat-desc">Anos de Experiência</div>
            </div>
            <div class="text-center">
              <div class="stat-value text-3xl text-primary">100+</div>
              <div class="stat-desc">Alunos Satisfeitos</div>
            </div>
            <div class="text-center">
              <div class="stat-value text-3xl text-primary">N1</div>
              <div class="stat-desc">Certificação JLPT</div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Diferenciais Section -->
    <div class="py-16 bg-base-100">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Por que escolher a Tie 先生?</h2>
          <p class="text-lg text-base-content/70">Metodologia diferenciada para resultados reais</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div class="card-body items-center text-center gap-4">
              <div class="text-5xl">👤</div>
              <h3 class="card-title text-2xl">Aulas Individuais</h3>
              <p class="text-base-content/80">Plano sob medida com foco nas suas necessidades e objetivos específicos. Aprenda no seu ritmo.</p>
              <div class="badge badge-primary badge-outline">Personalizado</div>
            </div>
          </div>
          <div class="card bg-gradient-to-br from-secondary/5 to-secondary/10 border border-secondary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div class="card-body items-center text-center gap-4">
              <div class="text-5xl">📝</div>
              <h3 class="card-title text-2xl">Acompanhamento Completo</h3>
              <p class="text-base-content/80">Material exclusivo e ajuda contínua. Estou sempre disponível para tirar suas dúvidas.</p>
              <div class="badge badge-secondary badge-outline">Suporte Total</div>
            </div>
          </div>
          <div class="card bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div class="card-body items-center text-center gap-4">
              <div class="text-5xl">💬</div>
              <h3 class="card-title text-2xl">Conversação Real</h3>
              <p class="text-base-content/80">Prática orientada para ganhar fluência desde as primeiras aulas. Fale japonês com confiança!</p>
              <div class="badge badge-accent badge-outline">Desde o Dia 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Como funcionam as aulas Section -->
    <div class="py-16 bg-base-200">
      <div class="container mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold mb-4">Como funcionam as aulas</h2>
          <p class="text-lg text-base-content/70">Metodologia moderna e eficiente</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div class="card-body gap-4">
              <div class="flex items-center gap-4">
                <div class="badge badge-primary badge-lg p-4">
                  <span class="text-2xl">🎥</span>
                </div>
                <h3 class="card-title">Plataforma Interativa</h3>
              </div>
              <p class="text-base-content/80 leading-relaxed">
                As aulas são realizadas via <span class="font-semibold">Zoom</span>, permitindo que você escreva na tela em tempo real. 
                Compartilhamento de materiais e interação dinâmica.
              </p>
              <div class="divider my-2"></div>
              <div class="badge badge-ghost">Tecnologia Moderna</div>
            </div>
          </div>
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div class="card-body gap-4">
              <div class="flex items-center gap-4">
                <div class="badge badge-secondary badge-lg p-4">
                  <span class="text-2xl">🎌</span>
                </div>
                <h3 class="card-title">Cultura Japonesa</h3>
              </div>
              <p class="text-base-content/80 leading-relaxed">
                Aprenda sobre a <span class="font-semibold">cultura japonesa</span> com explicações autênticas. 
                Como descendente, compartilho experiências e conhecimentos únicos.
              </p>
              <div class="divider my-2"></div>
              <div class="badge badge-ghost">Conhecimento Autêntico</div>
            </div>
          </div>
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div class="card-body gap-4">
              <div class="flex items-center gap-4">
                <div class="badge badge-accent badge-lg p-4">
                  <span class="text-2xl">📚</span>
                </div>
                <h3 class="card-title">Material Personalizado</h3>
              </div>
              <p class="text-base-content/80 leading-relaxed">
                Criação de <span class="font-semibold">material exclusivo</span> feito à mão para suprir suas necessidades específicas. 
                Flashcards, exercícios e muito mais.
              </p>
              <div class="divider my-2"></div>
              <div class="badge badge-ghost">Feito para Você</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-16 bg-gradient-to-r from-primary to-secondary">
      <div class="container mx-auto px-6 text-center text-primary-content">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          Pronto para começar sua jornada? 🚀
        </h2>
        <p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          Agende sua primeira aula experimental gratuita e descubra como é fácil e divertido aprender japonês!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a class="btn btn-neutral btn-lg gap-2 shadow-xl">
            📱 Entrar em Contato no WhatsApp
          </a>
          <a class="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-primary gap-2">
            ✉️ Enviar E-mail
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Landing only uses layout's Header/Footer
</script>

<style scoped>
/* Animação sutil para os cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.6s ease-out;
}

/* Efeito de hover suave */
.card:hover {
  transform: translateY(-8px) scale(1.02);
}
</style>
