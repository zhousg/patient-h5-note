<script setup>
import sdk from '@stackblitz/sdk';
import { onMounted } from 'vue';
onMounted(() => {
  sdk.embedGithubProject(
    'editor',
    'zhousg/vuex-demo',
    {
      height: '1000px',
      width: '1000px',
    },
  );
});
</script>

<template>
  <div id="editor"></div>
</template>

<style lang="scss" scoped>
#editor {
  position: fixed;
  height: 100vh;
  left: 0;
  top: 0;
  width: 100vw;
}
</style>
