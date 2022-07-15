<script setup lang="ts">
// 
</script>

<template>
  <div class="super-doctor-page">

  </div>
</template>

<style lang="scss" scoped>
.super-doctor-page {
  width: 395px;
  height: 832px;
  border: 10px solid #000;
  border-radius: 40px;
  margin-top: 20px;
  position: relative;
  transform: scale(0.8);
  transform-origin: 0 0;
  background: url(./phone.png) no-repeat -5px -10px;
  &::before {
    content: '';
    width: 180px;
    height: 24px;
    position: absolute;
    background-color: #000;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }
}

</style>
