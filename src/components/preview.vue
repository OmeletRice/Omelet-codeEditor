<template>
  <div class="om-coder-preview">
    <div class="om-coder-preview__topbar">
      [topbar]
    </div>
    <div class="om-coder-preview__contain">
      <iframe class="om-coder-preview__contain-iframe" ref="preview" @resize="handleResize"></iframe>
      <transition name="fade">
        <div v-show="isShowSize" class="om-coder-preview__size">
          <span class="om-coder-preview__size-width">{{ width }}</span>
          <span> X </span>
          <span class="om-coder-preview__size-height">{{ height }}</span>
        </div>
      </transition>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'OmCodePreview',

  props: {
    value: String
  },

  data() {
    return {
      width: 0,
      height: 0,
      isShowSize: false
    }
  },

  watch: {
    value(val) {
      this.updatePreview(val)
    }
  },

  methods: {
    handleResize() {
      if (this.$refs.preview) {
        this.isShowSize = true
        this.width = this.$refs.preview.offsetWidth || this.$refs.preview.clientWidth
        this.height = this.$refs.preview.offsetHeight || this.$refs.preview.clientHeight
      }
    },
    updatePreview() {
      var previewFrame = this.$refs.preview
      if (!previewFrame) return
      var preview = previewFrame.contentDocument || previewFrame.contentWindow.document
      preview.open()
      preview.write(this.value)
      preview.close()
    },
    hideSize() {
      setTimeout(_ => {
        this.isShowSize = false
      }, 1000)
    }
  },

  mounted() {
    const self = this
    window.addEventListener('resize', function() {
      self.handleResize()
    })
  }
}
</script>

<style>
.om-coder-preview {
  max-width: 100%;
  height: inherit;
}

.om-coder-preview__topbar {
  height: 50px;
  box-shadow: inset 0px -1px #dde1e6;
  background-color: #f4f5f9;
  line-height: 50px
}

.om-coder-preview__contain {
  height: calc(100% - 50px);
  position: relative;
  overflow: hidden;
}

.om-coder-preview__contain-iframe {
  width: 100%;
  height: 100%;
  outline: 0;
  border: 0
}

.om-coder-preview__size {
  color: #ffffff;
  position: absolute;
  left: 10px;
  top: 10px;
  width: 100px;
  height: 40px;
  line-height: 42px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.32);
  text-align: center;
  font-size: 13px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}

.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
