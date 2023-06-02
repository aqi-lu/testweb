<template>
  <div class="swiper-container swiper-container-h">
    <div class="swiper-wrapper">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="swiper-slide"
        :style="{
          backgroundImage:
            'linear-gradient(to right, ' + item.from + ', ' + item.to + ')',
        }"
      >
        <h2>{{ content }}</h2>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Swiper, { Autoplay, EffectFade } from "swiper";
Swiper.use([Autoplay, EffectFade]);
import "swiper/swiper-bundle.css";

const items = ref([
  {
    from: "#ee0979",
    to: "#ff6a00",
  },
  {
    from: "#4b6cb7",
    to: "#182848",
  },
  {
    from: "#f12711",
    to: "#f5af19",
  },
]);

const content = ref('aのhome')

onMounted(() => {
  new Swiper(".swiper-container-h", {
    effect: 'fade',
    loop: true, //是否循环播放
    setWrapperSize: true,
    spaceBetween: 0,
    centeredSlides: true, //设定当前页居中
    autoplay: {
      delay: 3000,
      disableOnInteraction: false, //解决滑动后不能轮播的问题
    },
    grabCursor: true, //使鼠标指针变为抓手,
  });
});
</script>

<style lang="less" scoped>
.swiper-container{
  --swiper-navigation-size:0;
  overflow: hidden;
}

.swiper-slide {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #fff;
  text-align: center;
}
</style>
