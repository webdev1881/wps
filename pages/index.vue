<template>
  <div>
    <Header />
    <main class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Home</h1>
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <!-- <swiper
          :slides-per-view="3"
          :space-between="20"
          @swiper="onSwiper"
          @slideChange="onSlideChange"
        >
          <swiper-slide v-for="item in items" :key="item.id">
            <div class="bg-white shadow-md rounded-lg overflow-hidden">
              <img :src="item.image" :alt="item.title" class="w-full h-48 object-cover">
              <div class="p-4">
                <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
                <p class="text-gray-600">{{ item.description }}</p>
                <button 
                  v-if="isLoggedIn"
                  @click="toggleFavorite(item)"
                  class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {{ item.isFavorite ? 'Remove from Favorites' : 'Add to Favorites' }}
                </button>
              </div>
            </div>
          </swiper-slide>
        </swiper> -->
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
// import { Swiper, SwiperSlide } from 'swiper/vue'
import { useUserStore } from '~/stores/user'
import Header from '@/components/Header.vue'

// Import Swiper styles
// import 'swiper/css'

const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.isLoggedIn)

const items = ref([])
const isLoading = ref(true)
const error = ref('')

const fetchItems = async () => {
  try {
    const response = await axios.get('https://sat7.faulio.com/api/v1/pageblocks/vod_main_page')
    // Assuming the API returns an array of items. Adjust this based on the actual API response structure.
    items.value = response.data.items.map(item => ({
      ...item,
      isFavorite: false // Initialize favorite status
    }))
  } catch (err) {
    error.value = 'Failed to fetch items'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const toggleFavorite = async (item) => {
  try {
    if (item.isFavorite) {
      await axios.get(`https://sat7.faulio.com/api/v1/member/favorites/remove?program=${item.id}`)
    } else {
      await axios.get(`https://sat7.faulio.com/api/v1/member/favorites/add?program=${item.id}`)
    }
    item.isFavorite = !item.isFavorite
  } catch (err) {
    console.error('Failed to update favorite status', err)
  }
}

onMounted(fetchItems)

const onSwiper = (swiper) => {
  console.log(swiper)
}

const onSlideChange = () => {
  console.log('slide change')
}
</script>

<style scoped>
/* Add any additional styles here */
</style>