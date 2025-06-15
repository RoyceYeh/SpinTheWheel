<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  isVisible: Boolean,
})

const emit = defineEmits(['close'])

const prize = [
  '郵輪',
  '住宿券',
  '咖啡優惠',
  '精美禮品',
  '祝你好運',
  '吃喝玩樂券',
  '住宿折扣券',
  '銀行好禮',
]

// 轉盤

// 配置參數
const numSegments = 6 // 轉盤分為幾個區域
const angleOffset = 15 // 角度的微調值 (可以為正數或負數)
const numRotations = 5 // 轉盤旋轉的圈數
const transitionDuration = 3000 // 動畫效果的過渡時間 (毫秒)
const delayBeforeRedirect = 1000 // 轉盤旋轉完畢後的延遲時間 (毫秒)
const useCustomID = true // 是否使用自訂 answer，若為 true 則不從 data.json 取 answer
const customID = ref(5) // 自訂的 answer useCustomID 要調成 true
const isSpinning = true // 是否可連續點擊

// 響應式狀態
const isClicked = ref(true) // 控制是否可點擊
const turntableRef = ref(null) // 轉盤元素的引用
const turntableStyle = reactive({
  transform: 'rotate(0deg)',
  transition: 'none',
})

// 新增控制
const showContent = ref(true)
const showWin = ref(false)
const showLose = ref(false)
const winText = ref('')

const handleClose = () => {
  // 重置所有狀態
  showContent.value = true
  showWin.value = false
  showLose.value = false
  isClicked.value = true
  resetTurntable()
  // 確保調用 emit
  emit('close')
}

// 重置轉盤至初始狀態 (0度)
const resetTurntable = () => {
  turntableStyle.transform = 'rotate(0deg)'
  turntableStyle.transition = 'none'
}

// 轉盤旋轉函數
const rotateFunc = (prizeId) => {
  const deg = (prizeId - 1) * (360 / numSegments) - angleOffset

  setTimeout(() => {
    // 開始新的旋轉，添加動畫效果
    turntableStyle.transform = `rotate(calc(360deg * ${numRotations} + ${deg}deg))`
    turntableStyle.transition = `all cubic-bezier(.38,.11,.27,1.06) ${transitionDuration / 1000}s`
  }, 50) // 給一個短暫的延遲來避免重置時的閃爍效果
}

// 開始旋轉並跳轉頁面
const startRotation = (prizeId) => {
  rotateFunc(prizeId)
  setTimeout(() => {
    // 轉盤旋轉結束後延遲再跳轉到結果頁面
    setTimeout(() => {
      showResult(prizeId)
      // 在跳轉或顯示結果後再次點擊
      isClicked.value = isSpinning
    }, delayBeforeRedirect)
  }, transitionDuration)
}

// 顯示獲獎結果
const showResult = (prizeId) => {
  const prizeText = prize[prizeId - 1]

  // 設置獲獎文字
  winText.value = `恭喜您獲得了 ${prizeText}！`

  // 隱藏遊戲內容，顯示獲獎畫面
  showContent.value = false

  // 判斷是否為"祝你好運"（未中獎）
  if (prizeText === '祝你好運') {
    showLose.value = true
  } else {
    showWin.value = true
  }
}

// 點擊事件處理
const handleClick = () => {
  if (!isClicked.value) return // 防止動畫期間再次點擊
  isClicked.value = false

  // 重置轉盤至初始狀態
  resetTurntable()

  if (useCustomID) {
    // 生成 1-8 的隨機數
    customID.value = Math.floor(Math.random() * 8) + 1
    // 使用自訂 answer
    startRotation(customID.value)
    console.log('自訂answer=', customID.value)
  }
}
</script>

<template>
  <div v-if="isVisible" class="lightbox">
    <div class="turntable_result">
      <div class="lbContainer">
        <div class="content" :class="{ active: showContent, close: !showContent }">
          <div class="title"><img src="@/assets/imgs/title_turntable.svg" alt="" /></div>
          <div class="turntable_page">
            <div class="turntable_container">
              <img class="table" src="@/assets/imgs/undertable.png" alt="" />
              <div class="table_container">
                <img
                  class="turntable"
                  ref="turntableRef"
                  :style="turntableStyle"
                  src="@/assets/imgs/turntable.png"
                  alt=""
                />
              </div>
              <div class="point" @click="handleClick">
                <img src="@/assets/imgs/go.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="win" :class="{ active: showWin, close: !showWin }">
          <div class="white">
            <div class="text">{{ winText }}</div>
            <button class="closeButton" @click="handleClose">
              <p>返回活動</p>
            </button>
          </div>
        </div>
        <div class="lose" :class="{ active: showLose, close: !showLose }">
          <div class="white">
            <div class="ghost"><img src="@/assets/imgs/lose_draw.png" alt="" /></div>
            <h1>
              QQ 沒中獎！
              <br />
              加油！繼續投票就有機會
            </h1>
            <button class="closeButton" @click="handleClose">
              <p>返回活動</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000; /* 確保在其他元素之上 */
  overflow: auto;
  padding-top: 50px;
  padding-bottom: 5px;
  .close-button {
    position: absolute;
    color: white;
    font-size: 2rem;
    border: none;
    background: none;
    cursor: pointer;
    top: 20px;
    right: 30px;
  }
  .turntable_result {
    padding: 0 15px;
  }
}

.lbContainer {
  position: relative;
  width: 100%;
  max-width: 840px;
  padding-bottom: 100px;
  margin: auto;
  background-color: #fffdaa;
  z-index: 1;
  padding: 0 15px;
  &::after {
    content: '';
    position: absolute;
    background-image: url(.@/assets/imgs/turn_lattice.svg);
    width: 100%;
    height: 72px;
    background-size: cover;
    background-repeat: no-repeat;
    bottom: 0;
    left: 0;
  }
  .content {
    padding-top: 50px;
    .title {
      max-width: 546px;
      margin: 0 auto;
      padding-bottom: 36px;
    }
    .turntable_page {
      overflow: hidden;
      h2 {
        margin-top: 25px;
        margin-bottom: 50px;
        text-align: center;
        color: #3e3a39;
        font-size: 50px;
        -webkit-text-stroke: transparent;
        font-weight: bold;
        > span {
          display: block;
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          color: #3e3a39;
        }
      }
      .turntable_container {
        position: relative;
        max-width: 740px;
        width: 100%;
        margin: 0px auto;

        z-index: 1;
        .table {
          width: 100%;
          margin: auto;
        }
        .circle {
          display: none;
        }
        .table_container {
          position: absolute;
          left: 2.8%;
          top: 2.8%;
          width: 94.5%;
          z-index: 1;
          max-width: 809px;
          .turntable {
            display: block;
            border: none;
            width: 100%;
          }
        }
        .point {
          position: absolute;
          left: 50%;
          top: 47.5%;
          transform: translate(-50%, -50%);
          max-width: 160px;
          width: 32.2%;
          cursor: pointer;
          z-index: 2;
        }
      }
    }
  }
  .win {
    display: none;
    padding-top: 100px;
    padding-bottom: 100px;
    .white {
      max-width: 640px;
      margin: 0 auto;
      background-color: #fff;
      padding: 50px;
      padding-top: 100px;
      position: relative;
      border-radius: 50px;
      .text {
        font-size: 35px;
        color: #ff986a;
        text-align: center;
        font-weight: bold;
        margin-bottom: 25px;
      }
      &::after {
        content: '';
        position: absolute;
        background-image: url(.@/assets/imgs/color_l.png);
        width: 384px;
        background-repeat: no-repeat;
        width: 50%;
        padding-bottom: 24%;
        top: 14px;
        left: 13%;
        background-size: cover;
        transform: translateX(-50%);
        z-index: 1;
      }
      &::before {
        content: '';
        position: absolute;
        background-image: url(.@/assets/imgs/color_r.png);
        width: 50%;
        background-repeat: no-repeat;
        padding-bottom: 24%;
        top: 14px;
        right: -37%;
        background-size: cover;
        transform: translateX(-50%);
        z-index: 1;
      }
      h1 {
        color: #72655a;
        text-align: center;
        font-size: 40px;
        font-weight: bold;
        line-height: 1;
        margin-bottom: 40px;
      }
      h2 {
        font-size: 35px;
        color: #ff986a;
        text-align: center;
        font-weight: bold;
      }
      h3 {
        font-size: 35px;
        color: #72655a;
        text-align: center;
        font-weight: bold;
        line-height: 1.1;
        margin-bottom: 25px;
      }
      p {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        color: #ff0030;
        margin-bottom: 40px;
      }

      .closeButton {
        margin: 0 auto;
        margin-top: 45px;
        max-width: 280px;
        display: block;
        background-color: #fffdc5;
        border: solid 2px #514943;
        padding: 23px;
        position: relative;
        z-index: 1;
        p {
          font-size: 30px;
          line-height: 1;
          font-weight: bold;
          color: #fff;
          transform: translate(-8px, -8px);
          transition: 0.25s linear;
          margin-bottom: 0;
          text-align: center;
        }
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: solid 2px #514943;
          background-color: #ff986a;
          top: -8px;
          left: -8px;
          z-index: -1;
          transition: 0.25s linear;
        }

        @media screen and (min-width: 980px) {
          &:hover {
            p {
              transform: translate(-2px, -2px);
            }
            &::after {
              top: -2px;
              left: -2px;
            }
          }
        }
      }
    }
    .butterfly {
      position: relative;
      z-index: 1;
      max-width: 384px;
      margin: 0 auto;
      transform: translateY(35px);
    }
  }

  .lose {
    display: none;
    padding-top: 250px;
    padding-bottom: 100px;
    .ghost {
      margin: 0 auto;
      max-width: 178px;
      transform: translateY(-30px);
      img {
        width: 100%;
        display: block;
      }
    }
    .white {
      max-width: 640px;
      margin: 0 auto;
      background-color: #fff;
      padding: 50px;
      padding-top: 0px;
      position: relative;
      border-radius: 50px;
      h1 {
        color: #72655a;
        text-align: center;
        font-size: 40px;
        font-weight: bold;
        line-height: 1.5;
        margin-bottom: 40px;
      }
      .closeButton {
        margin: 0 auto;
        margin-top: 45px;
        max-width: 280px;
        display: block;
        background-color: #fffdc5;
        border: solid 2px #514943;
        padding: 23px;
        position: relative;
        z-index: 1;
        p {
          font-size: 30px;
          line-height: 1;
          font-weight: bold;
          color: #fff;
          transform: translate(-8px, -8px);
          transition: 0.25s linear;
          margin-bottom: 0;
          text-align: center;
        }
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border: solid 2px #514943;
          background-color: #ff986a;
          top: -8px;
          left: -8px;
          z-index: -1;
          transition: 0.25s linear;
        }

        @media screen and (min-width: 980px) {
          &:hover {
            p {
              transform: translate(-2px, -2px);
            }
            &::after {
              top: -2px;
              left: -2px;
            }
          }
        }
      }
    }
  }

  .active {
    display: block;
  }
  .close {
    display: none;
  }
  @media screen and (max-width: 980px) {
    .lose {
      .white {
        h1 {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
