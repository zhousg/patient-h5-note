<script setup>
import sdk from '@stackblitz/sdk';
import { onMounted } from 'vue';
onMounted(() => {
  sdk.embedProject(
    'editor',
    {
      files: {
        'index.html': '!',
      },
      title: '测试',
      description: '测试',
      template: 'html',
    },
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
