<script setup>
const props = defineProps({
  hotel: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div href="javascript:;" class="cardLink">
    <div class="imgBox">
      <img :src="hotel.imageUrl" alt="" />
    </div>
    <div class="box">
      <h3 class="txt">{{ hotel.hotelName }}</h3>
      <div class="locate">
        <p>{{ hotel.country }}</p>
        <p>{{ hotel.city }}</p>
      </div>
      <div class="vote">{{ hotel.totalVotes }} <span>票</span></div>
      <div class="btn">點擊投票</div>
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
}
</style>
