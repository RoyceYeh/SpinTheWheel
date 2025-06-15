<script setup>
import CityView from '@/components/CityView.vue'
import HealingResorts from '@/components/HealingResorts.vue'
import StylishDesign from '@/components/StylishDesign.vue'
import { useHotelStore } from '@/stores'
import { ref, computed, onMounted } from 'vue'
import { useLightbox } from '@/composables/useLightbox'
import Lightbox from '@/components/Lightbox.vue'

const hotelStore = useHotelStore()
const currentTab = ref('StylishDesign') // 預設第一個 tab
const totalComponents = { StylishDesign, HealingResorts, CityView }

// 使用 computed 來取得資料
const hotelData = computed(() => hotelStore.data || [])

const { isVisible, closeLightbox } = useLightbox()

onMounted(async () => {
  await hotelStore.fetchHotelData()
  // 資料載入後，設置預設 tab
  if (hotelData.value && hotelData.value.length > 0) {
    currentTab.value = hotelData.value[0].themeId // 預設為第一個 themeId
  }
})
</script>

<template>
  <div class="banner"></div>
  <div class="wrap">
    <div class="container">
      <div class="button-group">
        <button
          v-for="(hotel, index) in hotelData"
          :key="index"
          :class="['tab-button', `tab${index}`, { active: currentTab === hotel.themeId }]"
          @click="currentTab = hotel.themeId"
        >
          {{ hotel.themeName }}
        </button>
      </div>
      <component :is="totalComponents[currentTab]" />

      <!-- 統一的 Lightbox 組件 -->
      <Lightbox @close="closeLightbox" :isVisible="isVisible" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  padding: 50px 0;
  background-color: #fffdaa;
}
.banner {
  background-image: url('../assets/imgs/vote_pc.png');
  padding-bottom: 31.25%;
  background-size: cover;
  background-repeat: no-repeat;
  @media screen and (max-width: 980px) {
    background-image: url('../assets/imgs/vote.png');
    padding-bottom: 64.5%;
  }
}
.container {
  width: 100%;
  max-width: 1232px;
  margin: 0 auto;
  padding: 0 15px;
}
.button-group {
  display: flex;
  // gap: 0.1%;
  button {
    border: none;
  }
  .tab-button {
    width: 33.33333%;
    font-size: 28px;
    font-weight: bold;
    padding: 15px 10px;
    border: 1px solid;
    cursor: pointer;
    color: #000;
    &.active {
      border-bottom: unset;
    }
  }
  .tab0 {
    background-color: #deb9ed;
  }
  .tab1 {
    background-color: #94eeec;
    margin-left: -1px;
  }
  .tab2 {
    background-color: #ffbca1;
    margin-left: -2px;
  }
  @media screen and (max-width: 980px) {
    .tab-button {
      font-size: 20px;
    }
  }
  @media screen and (max-width: 576px) {
    .tab-button {
      font-size: 16px;
      font-weight: bold;
      padding: 10px 5px;
    }
  }
}
</style>
