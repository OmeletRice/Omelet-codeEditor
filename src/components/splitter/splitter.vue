<template>
  <div :style="{ cursor, userSelect }" class="om-splitter" @mouseup="onUp" @mousemove="onMouseMove" @touchmove="onMove" @touchend="onUp">
    <div :style="{ width: percent+'%', minWidth: leftMinWidth + 'px' }" class="left-pane om-splitter-pane">
      <slot name="left-pane"></slot>
    </div>
    <div class="om-splitter-inner" :class="{active}" @mousedown="onDown" @click="onClick" @touchstart.prevent="onDown">
    </div>
    <div :style="{ width: 100 - percent + '%', minWidth: rightMinWidth + 'px'}" class="right-pane om-splitter-pane">
      <slot name="right-pane"></slot>
    </div>
    <div v-if="active" class="om-spliter-inner-modal"></div>
  </div>
</template>
<style>
.om-splitter {
  height: inherit;
  display: flex;
  z-index: 150;
}
.om-splitter-pane {
  height: inherit;
}
.om-splitter-inner {
  width: 5px;
  background-color: #dde1e6;
  cursor: ew-resize;
  position: relative;
}
.om-splitter-inner:before {
  border-radius: 5px;
  box-shadow: 0px 0px 1px 1px #53535347;
  background-color: #dce0e5;
  content: " ";
  width: 14px;
  height: 40px;
  position: absolute;
  top: 50%;
  right: -4px;
  z-index: 150;
  /* background: #000000;
  background: -moz-linear-gradient(top, #000000 0%, #999999 18%, #000000 34%, #999999 50%, #000000 66%, #999999 80%, #000000 100%);
  background: -webkit-linear-gradient(top, #000000 0%,#999999 18%,#000000 34%,#999999 50%,#000000 66%,#999999 80%,#000000 100%);
  background: linear-gradient(to bottom, #000000 0%,#999999 18%,#000000 34%,#999999 50%,#000000 66%,#999999 80%,#000000 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#000000',GradientType=0 ); */
}
.om-spliter-inner-modal {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 149;
}
</style>
<script>
export default {
  props: {
    margin: {
      type: Number,
      default: 10
    },
    leftMinWidth: Number,
    rightMinWidth: Number
  },
  data() {
    return {
      active: false,
      percent: 50,
      hasMoved: false
    };
  },
  computed: {
    userSelect() {
      return this.active ? 'none' : '';
    },
    cursor() {
      return this.active ? 'ew-resize' : '';
    }
  },
  methods: {
    onClick() {
      if (!this.hasMoved) {
        this.percent = 50;
        this.$emit('resize');
      }
    },
    onDown(e) {
      this.active = true;
      this.hasMoved = false;
    },
    onUp() {
      this.active = false;
      this.$emit('resize-end')
    },
    onMove(e) {
      if (this.active) {
        let offset = 0;
        let target = e.currentTarget;
        while (target) {
          offset += target.offsetLeft;
          target = target.offsetParent;
        }
        const percent =
          Math.floor((e.pageX - offset) / e.currentTarget.offsetWidth * 10000) /
          100;
        if (percent > this.margin && percent < 100 - this.margin) {
          this.percent = percent;
        }
        this.$emit('resize');
        this.hasMoved = true;
      }
    },
    onMouseMove(e) {
      if (e.buttons === 0 || e.which === 0) {
        this.active = false;
      }
      this.onMove(e);
    }
  }
};
</script>
