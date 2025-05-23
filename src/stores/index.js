import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = 'https://api.jsonbin.io/v3/b/683010cb8960c979a59fed8c'

const API_KEY = '$2a$10$b6qCEGeNbbf978TZzWSPm.btlR2u8B0NSLFhUstS4DaH3usdJDZIS'
export const useHotelStore = defineStore('hotelData', () => {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

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
        // console.log('旅店資料獲取成功:', apiData)
        data.value = apiData
        // data.value = transformData(apiData)
        // console.log('旅店資料獲取成功:', data.value)
      }
    } catch (err) {
      console.error('獲取旅店資料時出錯:', err)
      error.value = err.message || '獲取旅店資料失敗'
    } finally {
      loading.value = false
    }
  }

  // 初始化時載入資料
  fetchHotelData()

  return { data, fetchHotelData }
})
