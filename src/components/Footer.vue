<template>
  <footer class="relative overflow-hidden">
    <!-- Elementos decorativos japoneses no fundo -->
    <div class="absolute inset-0 opacity-5 pointer-events-none">
      <div class="absolute top-10 left-10 text-8xl">🌸</div>
      <div class="absolute top-20 right-20 text-8xl">⛩️</div>
      <div class="absolute bottom-20 left-1/4 text-8xl">🎋</div>
      <div class="absolute bottom-10 right-1/3 text-8xl">🏯</div>
    </div>

    <!-- Conteúdo principal do footer -->
    <div class="footer bg-gradient-to-br from-base-200 via-base-300 to-base-200 text-base-content p-10 relative z-10">
      <aside class="w-full flex flex-col md:flex-row items-center md:justify-between md:items-start gap-4">
        <div class="flex justify-between gap-3">
          <div class="text-5xl animate-pulse">🌸</div>
          <div>
            <p class="font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tiensino Japonês
            </p>
            <p class="text-sm text-base-content/70">日本語を学びましょう</p>
          </div>
        </div>
        <p class="text-base-content/80 max-w-xs text-center md:text-left leading-relaxed">
          Ensino de japonês de forma <span class="font-semibold text-primary">descomplicada</span> e divertida. 
          Aulas personalizadas para todos os níveis.
        </p>

        <div class="flex gap-4">
          <a href="#" class="btn btn-circle btn-ghost hover:bg-primary/20 hover:text-primary transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
          </a>
          <a href="#" class="btn btn-circle btn-ghost hover:bg-primary/20 hover:text-primary transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a href="#" class="btn btn-circle btn-ghost hover:bg-primary/20 hover:text-primary transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
          <a href="#" class="btn btn-circle btn-ghost hover:bg-primary/20 hover:text-primary transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
            </svg>
          </a>
        </div>
      </aside>
    </div>

    <!-- Barra inferior com copyright -->
    <div class="footer footer-center bg-base-300 text-base-content p-6 border-t border-base-content/10 relative z-10">
      <aside class="flex flex-col sm:flex-row items-center gap-4">
        <p class="flex items-center gap-2">
          <span>©</span>
          <span>{{ new Date().getFullYear() }}</span>
          <span class="font-semibold">Tiensino Japonês</span>
          <span class="hidden sm:inline">-</span>
          <span>Todos os direitos reservados</span>
        </p>
        <div class="divider divider-horizontal hidden sm:flex"></div>
        <div class="flex gap-4 text-sm">
          <a href="#" class="link link-hover hover:text-primary transition-colors">Política de Privacidade</a>
          <a href="#" class="link link-hover hover:text-primary transition-colors">Termos de Uso</a>
        </div>
      </aside>
    </div>

    <!-- Decoração extra no rodapé -->
    <div class="h-1 bg-gradient-to-r from-primary via-secondary to-accent"></div>
  </footer>
</template>

<style scoped>
/* Animação para os ícones de redes sociais */
.btn-circle:hover {
  transform: scale(1.1) rotate(5deg);
  transition: all 0.3s ease;
}

/* Animação do logo */
@keyframes pulse-soft {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

.animate-pulse {
  animation: pulse-soft 3s ease-in-out infinite;
}

/* Efeito gradient no texto */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* Transições suaves */
.link-hover {
  transition: all 0.3s ease;
}

.link-hover:hover {
  padding-left: 0.5rem;
}

/* Footer title com estilo */
.footer-title {
  color: oklch(var(--p));
  font-weight: 600;
  margin-bottom: 1rem;
}
</style>