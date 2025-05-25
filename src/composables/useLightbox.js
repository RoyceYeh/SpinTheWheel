import { ref } from 'vue'

// 全局狀態 - 所有組件共享同一個 lightbox 實例
const isVisible = ref(false)
const currentIndex = ref(0)

export function useLightbox() {
  const openLightbox = (index = 0) => {
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

  const handleVoteAndOpenLightbox = (index = 0) => {
    openLightbox(index)
  }

  return {
    // 狀態
    isVisible,
    currentIndex,
    // 方法
    openLightbox,
    closeLightbox,
    handleVoteAndOpenLightbox,
  }
}
