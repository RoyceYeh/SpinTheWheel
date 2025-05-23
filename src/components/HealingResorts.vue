<script setup>
import { computed, ref } from 'vue'
import HotelCard from './HotelCard.vue'
import Lightbox from './Lightbox.vue'
import { useHotelStore } from '@/stores'
const hotelStore = useHotelStore()
const hotelData = computed(() => hotelStore.data)
const hotelList = hotelData.value[1].hotelList

const openLightbox = (index) => {
  currentIndex.value = index
  isVisible.value = true
  // 防止背景滾動
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  isVisible.value = false
  // 恢復背景滾動
  document.body.style.overflow = ''
}
</script>

<template>
  <div class="tab">
    <div class="wrap">
      <HotelCard
        v-for="(hotel, index) in hotelList"
        :key="hotel.hotelName"
        @click="openLightbox(index)"
        :hotel="hotel"
      />
    </div>
  </div>

  <Lightbox @close="closeLightbox" :isVisible="isVisible" />
</template>

<style scoped lang="scss">
.tab {
  padding: 60px 10px;
  margin-right: 3px;
  background-color: #94eeec;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
}
.wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3%;
}

.cardLink {
  background-color: white;
  max-width: 300px;
  width: 100%;
  border-radius: 10px;
  text-decoration: none;

  &:hover {
    img {
      transform: scale(1.08);
    }
    .btn {
      background-color: rgb(23, 172, 31);
    }
  }
  img {
    width: 100%;
    min-height: 300px;
    object-fit: cover;
    transition: all 0.3s linear;
    border-radius: 10px 10px 0 0;
  }
  .imgBox {
    height: 15vw;
    overflow: hidden;
    border-radius: 10px 10px 0 0;
  }
  .box {
    padding: 15px;
    color: black;
  }
  .locate {
    display: flex;
    margin-bottom: 15px;
    p {
      font-size: 1rem;
    }
  }
  .txt {
    margin-bottom: 5px;
    line-height: 1.5;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .btn {
    background-color: rgb(57, 210, 159);
    padding: 8px 10px;
    border-radius: 10px;
    letter-spacing: 2px;
    max-width: 200px;
    width: 100px;
    margin: auto;
    text-align: center;
    transition: all 0.15s linear;
    color: white;
  }
}
</style>
