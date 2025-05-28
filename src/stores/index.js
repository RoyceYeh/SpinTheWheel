import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = 'https://api.jsonbin.io/v3/b/683010cb8960c979a59fed8c'
const API_KEY = '$2a$10$b6qCEGeNbbf978TZzWSPm.btlR2u8B0NSLFhUstS4DaH3usdJDZIS'

export const useHotelStore = defineStore('hotelData', () => {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // 追蹤已投票的主題 (每個主題只能投一次票)
  const votedThemes = ref(new Set())

  // 獲取旅店資料
  const fetchHotelData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get(API_BASE_URL, {
        headers: {
          'X-Master-Key': API_KEY,
        },
      })

      if (response.status === 200) {
        const apiData = response.data.record.themes
        data.value = apiData
        // console.log(data.value)
      }
    } catch (err) {
      console.error('獲取旅店資料時出錯:', err)
      error.value = err.message || '獲取旅店資料失敗'
    } finally {
      loading.value = false
    }
  }

  // 檢查該主題是否已投票
  const hasVotedInTheme = (themeId) => {
    return votedThemes.value.has(themeId)
  }

  // 更新投票數
  const updateVotes = async (themeId, hotelName) => {
    if (!data.value) return false

    // 檢查該主題是否已投票
    if (votedThemes.value.has(themeId)) {
      console.log(`${themeId} 主題已經投過票了`)
      return false
    }

    try {
      // 找到對應的主題和酒店
      const theme = data.value.find((t) => t.themeId === themeId)
      if (!theme) return false

      const hotel = theme.hotelList.find((h) => h.hotelName === hotelName)
      if (!hotel) return false

      // 立即增加投票數（本地更新）
      hotel.totalVotes = (hotel.totalVotes || 0) + 1

      // 記錄該主題已投票
      votedThemes.value.add(themeId)

      // console.log(`${hotelName} 投票成功，目前票數: ${hotel.totalVotes}`)

      // 背景更新到遠端 API（不等待結果）
      axios
        .put(
          API_BASE_URL,
          {
            themes: data.value,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Master-Key': API_KEY,
            },
          },
        )
        .catch((err) => {
          console.error('背景更新投票到遠端失敗:', err)
        })

      return true
    } catch (err) {
      console.error('更新投票時出錯:', err)
      return false
    }
  }

  // 初始化時載入資料
  fetchHotelData()

  return {
    data,
    loading,
    error,
    votedThemes,
    fetchHotelData,
    updateVotes,
    hasVotedInTheme,
  }
})
