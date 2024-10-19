<template>
    <header class="bg-white shadow">
      <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold text-gray-800">My App</NuxtLink>
        <div>
          <template v-if="isLoggedIn">
            <span class="mr-4">Welcome, {{ userEmail }}</span>
            <button 
              @click="logout" 
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </template>
          <NuxtLink 
            v-else 
            to="/signin" 
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </NuxtLink>
        </div>
      </nav>
    </header>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '~/stores/user'
  
  const router = useRouter()
  const userStore = useUserStore()
  
  const isLoggedIn = computed(() => userStore.isLoggedIn)
  const userEmail = computed(() => userStore.user?.email || '')
  
  const logout = () => {
    userStore.logout()
    router.push('/signin')
  }
  </script>