<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
            asd@as.as
            123456
            {{ isLoading }}
          </h2>
        </div>
        <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="email"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              >
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                v-model="password"
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              >
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :disabled="isLoading"
            >
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Heroicon name: solid/lock-closed -->
                <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </span>
              
              {{ isLoading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>
        <p v-if="error" class="mt-2 text-center text-sm text-red-600">
          {{ error }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '~/stores/user'
  import axios from 'axios'
  
  const router = useRouter()
  const userStore = useUserStore()
  
  const email = ref('tkachenko9119@gmail.com')
  const password = ref('Saiz1516010')
  const error = ref('')
  const isLoading = ref(false)
  
  const handleSubmit = async () => {
    error.value = ''
    isLoading.value = true
  
    try {
      const response = await axios.post('https://sat7.faulio.com/api/v1/login/signin', {
        email: email.value,
        password: password.value,
        device_os: "Windows 10",
        device_type: "browser",
        uniq_device_id: "zonutkfxiinsog6rtpij5zlm2g93p49"
      })
  
      console.log(response.data.data);
      if (response.data.data.auth_token) {
        
        userStore.setToken(response.data.data.auth_token)
        userStore.setUser(response.data.data.name)
        router.push('/')
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        error.value = err.response.data.message || 'An error occurred during sign in'
      } else {
        error.value = 'An unexpected error occurred'
      }
    } finally {
      isLoading.value = false
    }
  }
  </script>