<template>
  <div class="h-main">
    <div class="h-left">
      <div class="des">公告区域</div>
    </div>
    <div class="h-right">
      <div class="r-top">
        <div class="des">
          <div class="des-content">
            花团锦簇的节日用来铭记逝者,而我,宁愿被人遗忘
          </div>
          <div class="des-author">
            <div>-永恩</div>
          </div>
        </div>
        <div class="des">
          <div class="des-content clock">
            <div>{{ year }}年{{ month }}月{{ day }}日</div>
            <div class="time">
              <span>{{ hours }}</span> : <span>{{ minutes }}</span> :
              <span>{{ seconds }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="r-bottom">
        <div class="des">资源库</div>
        <div class="des">空间</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import moment from "moment";


const year = ref()
const month = ref()
const day = ref()
const hours = ref();
const minutes = ref();
const seconds = ref();

// 更新时钟
function updateClock() {
  const now = moment();
  year.value = now.format('YYYY')
  month.value = now.format('MM')
  day.value = now.format('DD')
  hours.value = ("0" + (now.hours() % 12 || 12)).slice(-2);
  minutes.value = ("0" + now.minutes()).slice(-2);
  seconds.value = ("0" + now.seconds()).slice(-2);
}

// 每秒钟更新一次时钟
onMounted(() => {
  setInterval(updateClock, 1000);
});
</script>

<style lang="less" scoped>
.h-main {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: space-around;
  .h-left {
    .des {
      background: rgb(0 0 0 / 25%);
      padding: 10px;
      border-radius: 6px;
      margin-top: 3.5px;
      display: flex;
      justify-content: space-between;
      height: 100%;
      width: 100%;
      transition: backdrop-filter 0.3s ease-in-out;
    }
    .des:hover{
      backdrop-filter: blur(10px);
    }
  }
  .h-right {
    .r-top {
      display: flex;
      justify-content: space-around;
      .des {
        background: rgb(0 0 0 / 25%);
        margin: 3.5px 12px 5px 5px;
        padding: 20px;
        border-radius: 6px;
        transition: backdrop-filter 0.3s ease-in-out;
        .des-content {
          max-width: 200px;
        }
        .des-author {
          margin-top: 15px;
          display: flex;
          justify-content: flex-end;
        }
        .clock {
          //
          .time {
            margin-top: 15px;
          }
        }
      }
      .des:hover{
      backdrop-filter: blur(10px);
    }
    }
    .r-bottom {
      display: flex;
      margin-top: 125px;
      .des {
        background: rgb(0 0 0 / 25%);
        margin: 3.5px 12px 5px 5px;
        padding: 10px;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        transition: backdrop-filter 0.3s ease-in-out;
      }
      .des:hover{
      backdrop-filter: blur(10px);
    }
    }
  }
}
</style>
