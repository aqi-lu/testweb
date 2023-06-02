<template>
  <div class="home-page">
    <div class="swiper-container swiper-container-v" ref="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <banner />
        </div>
        <div class="swiper-slide main">Slide 2</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import banner from "./components/banner.vue";
import "swiper/swiper-bundle.css";
import Swiper, { Pagination, Mousewheel, Navigation } from "swiper";
Swiper.use([Pagination, Mousewheel, Navigation])

const swiper = ref(null) as any;

onMounted(() => {
  new Swiper('.swiper-container-v', {
      direction: "vertical",
      slidesPerView: 1,
      mousewheel: {
        releaseOnEdges: true,
      },
      setWrapperSize: true,
      spaceBetween: 0,
      centeredSlides: true,
  });
});
</script>

<style lang="less" scoped>
.home-page{
  overflow: hidden;
}
.swiper-container {
  height: 100vh;
}

.swiper-slide {
  text-align: left;
  font-size: 18px;
  color: #222222;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: context-menu;
  width: 100%;
}

.main {
  height: 100vh;
  width: 100%;
  background: url('@/assets/home/fly.png') center no-repeat;
  background-size: 100% 100%;
  color: #fff;
}

</style>
