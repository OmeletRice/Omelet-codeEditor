<template>
  <div class="om-coder">
    <om-splitter :left-min-width="600" :right-min-width="360" @resize="handleResize" @resize-end="handleResizeEnd">
      <om-code-edit :value="value" @change="handleChange" slot="left-pane"></om-code-edit>
      <om-code-preview :value="value" slot="right-pane" ref="preview"></om-code-preview>
    </om-splitter>
  </div>
</template>

<script>
import OmCodeEdit from './components/coder.vue'
import OmCodePreview from './components/preview.vue'
import OmSplitter from './components/splitter/splitter.vue'
export default {
  name: 'Coder',

  components: {
    OmCodeEdit,
    OmCodePreview,
    OmSplitter
  },

  data() {
    return {
      value: ''
    }
  },

  methods: {
    handleChange(val) {
      this.value = val
    },
    handleResize() {
      this.$refs.preview.handleResize()
    },
    handleResizeEnd() {
      this.$refs.preview.hideSize()
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.om-coder {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  max-width: 100%;
  font-family: Helvetica Neue,Helvetica,Microsoft YaHei,\\5FAE\8F6F\96C5\9ED1,Arial,sans-serif;
}

.om-coder .om-coder-edit,
.om-coder .om-coder-preview {
  /* display: inline-block */
  position: relative;
  overflow: hidden;
}

.om-coder .CodeMirror {
  height: calc(100% - 50px);
}
</style>
