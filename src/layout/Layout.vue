<template>
    <div class="w-full min-h-screen">
        <Header />
        <main class="flex-1 w-full">
            <RouterView />
        </main>

        <Footer />
    </div>
</template>

<script setup lang="ts">
import { Header, Footer } from '@/components'
import { RouterView } from 'vue-router'

</script>