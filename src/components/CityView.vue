<script setup>
import { computed } from 'vue'
import HotelCard from './HotelCard.vue'
import { useHotelStore } from '@/stores'
import { useLightbox } from '@/composables/useLightbox'

const hotelStore = useHotelStore()
const hotelData = computed(() => hotelStore.data)

// 使用 lightbox composable
const { handleVoteAndOpenLightbox } = useLightbox()

// 根據 themeId 獲取對應的酒店列表
const hotelList = computed(() => {
  if (!hotelData.value || !Array.isArray(hotelData.value)) return []
  const theme = hotelData.value.find((t) => t.themeId === 'CityView')
  return theme ? theme.hotelList : []
})

// 處理投票事件，直接使用 composable
const handleVote = (index) => {
  handleVoteAndOpenLightbox(index)
}
</script>

<template>
  <div class="tab">
    <div class="wrap">
      <HotelCard
        v-for="(hotel, index) in hotelList"
        :key="hotel.hotelName"
        :hotel="hotel"
        :theme-id="'CityView'"
        @vote="handleVote(index)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tab {
  padding: 60px 10px;
  background-color: #ffbca1;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  margin-right: 3.5px;
}
.wrap {
  max-width: 95%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  justify-items: center;
  gap: 3%;
  row-gap: 30px;
  @media screen and (max-width: 980px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.cardLink {
  background-color: white;
  max-width: 350px;
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
    // min-height: 300px;
    object-fit: cover;
    transition: all 0.3s linear;
    border-radius: 10px 10px 0 0;
  }
  .imgBox {
    height: 15vw;
    min-height: 300px;
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
