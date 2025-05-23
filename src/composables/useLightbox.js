// useLightbox.js
import { ref, onMounted, onUnmounted } from 'vue'

export default function useLightbox(images) {
  const isVisible = ref(false)
  const currentIndex = ref(0)
  const imageList = ref(images) // 接收圖片列表

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

  const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % imageList.value.length
  }

  const prevImage = () => {
    currentIndex.value = (currentIndex.value - 1 + imageList.value.length) % imageList.value.length
  }

  return {
    isVisible,
    currentIndex,
    imageList,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
  }
}
