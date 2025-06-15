import { ref } from 'vue'

// 全局狀態 - 所有組件共享同一個 lightbox 實例
const isVisible = ref(false)
const currentIndex = ref(0)

export function useLightbox() {
  const openLightbox = (index = 0) => {
    // 重置狀態
    currentIndex.value = index
    isVisible.value = true
    // 防止背景滾動
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    // 確保狀態被重置
    isVisible.value = false
    currentIndex.value = 0
    // 恢復背景滾動
    document.body.style.overflow = ''
  }

  const handleVoteAndOpenLightbox = (index = 0) => {
    // 確保先關閉再打開，以觸發重置
    closeLightbox()
    setTimeout(() => {
      openLightbox(index)
    }, 100)
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
