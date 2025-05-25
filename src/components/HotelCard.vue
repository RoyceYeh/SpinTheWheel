<script setup>
import { computed } from 'vue'
import { useHotelStore } from '@/stores'

const props = defineProps({
  hotel: {
    type: Object,
    required: true,
  },
  themeId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['vote'])

const hotelStore = useHotelStore()

// 檢查該主題是否已投票
const hasVotedInTheme = computed(() => {
  return hotelStore.hasVotedInTheme(props.themeId)
})

// 處理卡片點擊 - 投票並打開 lightbox
const handleCardClick = async () => {
  if (hasVotedInTheme.value) {
    alert('您已經在這個主題中投過票了！')
    return
  }

  try {
    const success = await hotelStore.updateVotes(props.themeId, props.hotel.hotelName)
    if (success) {
      emit('vote')
    }
  } catch (error) {
    console.error('投票過程中出錯:', error)
  }
}
</script>

<template>
  <div class="cardLink" :class="{ 'has-voted': hasVotedInTheme }" @click="handleCardClick">
    <div class="imgBox">
      <img :src="hotel.imageUrl" alt="" />
    </div>
    <div class="box">
      <h3 class="txt">{{ hotel.hotelName }}</h3>
      <div class="locate">
        <p>{{ hotel.country }}</p>
        <p>{{ hotel.city }}</p>
      </div>
      <div class="vote">{{ hotel.totalVotes || 0 }} <span>票</span></div>
      <div class="btn">
        {{ hasVotedInTheme ? '已投票' : '點擊投票' }}
      </div>
    </div>

    <!-- 已投票遮罩 -->
    <div v-if="hasVotedInTheme" class="voted-overlay">
      <div class="voted-badge">✓ 此主題已投票</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cardLink {
  background-color: white;
  max-width: 300px;
  width: 100%;
  border-radius: 10px;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;

  &:hover:not(.has-voted) {
    img {
      transform: scale(1.08);
    }
    .btn {
      background-color: rgb(23, 172, 31);
    }
  }

  &.has-voted {
    cursor: not-allowed;
    opacity: 0.7;

    .btn {
      background-color: #ccc;
      color: #666;
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
    position: relative;

    .vote {
      position: absolute;
      content: '';
      background-color: #4b8df0;
      color: #fff;
      font-size: 16px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      right: 10px;
      top: -50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      span {
        font-size: 14px;
      }
    }
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

  // 已投票遮罩
  .voted-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    .voted-badge {
      background-color: rgba(57, 210, 159, 0.9);
      color: white;
      padding: 10px 20px;
      border-radius: 20px;
      font-weight: bold;
      font-size: 16px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
  }
}
</style>
