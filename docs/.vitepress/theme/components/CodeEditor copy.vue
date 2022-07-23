<script setup>
import { onMounted } from 'vue';
import * as emmet from 'emmet'
window.emmetPath = '/'
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/snippets/html';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-emmet';
import 'ace-builds/src-noconflict/ext-elastic_tabstops_lite';
import 'ace-builds/src-noconflict/keybinding-vscode';
ace.config.set('workerPath','/');

onMounted(() => {
  const editor = ace.edit('editor', {
    theme: 'ace/theme/monokai',
    mode: 'ace/mode/html',
    tabSize: 2,
    maxLines: 25,
    minLines: 25,
    showPrintMargin: false,
    fontSize: 14,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    enableBasicAutocompletion: true,
    enableEmmet: true,
    useElasticTabstops: true
  });
});
</script>

<template>
  <div id="editor"></div>
</template>

<style lang="scss" scoped>
#editor {
  height: 500px;
}
</style>
