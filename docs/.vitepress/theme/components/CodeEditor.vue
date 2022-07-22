<script setup>
import { onMounted } from 'vue'
import * as ace from 'brace';
import 'brace/mode/html';
import 'brace/theme/monokai';
onMounted(()=>{
  const editor = ace.edit('editor');
  editor.getSession().setMode('ace/mode/javascript');
  editor.setTheme('ace/theme/monokai');

})
</script>

<template>
  <div id="editor">const age = 18;</div>
</template>

<style lang="scss" scoped>
#editor {
  height: 500px;
}
</style>
