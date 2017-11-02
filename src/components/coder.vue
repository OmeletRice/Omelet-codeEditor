<template>
  <div class="om-coder-edit">
    <div class="om-coder-edit__topbar">
      <div class="file-info">
        <div class="file-info-icon"></div>
        <div class="file-info-title">
          <span>Text[Text]</span>
        </div>
      </div>
      <div class="file-tooltip">
        <span>{{ $tc('om.coderedit.topbar.tooltip', 1) }}</span>
        <a class="file-tooltip-upload" href="./">{{ $tc('om.coderedit.topbar.tooltip', 2) }}</a>
      </div>
    </div>
    <om-code-mirror class="om-coder-edit__document" ref="myEditor" :code="code" :options="editorOptions" 
              @ready="onEditorReady"
              @focus="onEditorFocus"
              @change="onEditorCodeChange"></om-code-mirror>
  </div>  
</template>

<script>
import OmCodeMirror from './codemirror/codemirror.vue';

export default {
  name: 'OmCodeEdit',

  props: {
    value: [String, Document]
  },

  data() {
    return {
      editorOptions: {
        // codemirror options
        tabSize: 2,
        mode: 'text/html',
        theme: 'material',

        lineNumbers: true,
        line: true,
        lineWrapping: true,

        // sublime、emacs、vim
        // keyMap: 'sublime',
        // 按键映射，比如Ctrl键映射autocomplete，autocomplete是hint代码提示事件
        extraKeys: {
          'Shift-,': (cm, pred) => {
            cm.doc.replaceSelection('<')
            if (!pred || pred()) {
              setTimeout(function() {
                if (!cm.state.completionActive) cm.showHint({ completeSingle: false })
              }, 100);
            }
            return cm.Pass
          },
          // '/': 'autocomplete',
          'Ctrl-Space': 'autocomplete',
          'Ctrl-Q': (cm) => {
            cm.foldCode(cm.getCursor()) // 代码折叠
          }
        },
        // 代码折叠
        foldGutter: true,
        gutters: [
          'CodeMirror-linenumbers', // 使用此功能可以为行号槽提供背景或宽度。
          'CodeMirror-foldgutter',
          'CodeMirror-focused', // 每当编辑器聚焦时，顶级元素都会获得此类。
          'CodeMirror-gutters', // 这是所有沟槽的背景。
          'CodeMirror-selected', // 该选择span由此类的元素表示。
          'CodeMirror-foldmarker',
          'CodeMirror-lines', // 可见线。这是您为编辑器内容指定垂直填充的位置。
          'CodeMirror-lint-markers',
          'CodeMirror-gutter-filler'
        ],
        // 选中文本自动高亮，及高亮方式
        styleSelectedText: true,
        highlightSelectionMatches: {
          showToken: /\w/,
          annotateScrollbar: true
        },
        // more codemirror options...
        lint: true,

        // styleActiveLine: true,

        matchBrackets: true,
        smartIndent: true,
        autoCloseTags: true,
        autoCloseBrackets: true,

        scrollbarStyle: 'simple'

        // hintOptions: {
        //   schemaInfo: null
        // }
      }
    };
  },

  methods: {
    onEditorReady(editor) {
      // console.log('the editor is readied!', editor)
    },
    onEditorFocus(editor) {
      // console.log('the editor is focus!', editor)
    },
    onEditorCodeChange(newCode) {
      // console.log('this is new code', newCode)
      // this.code = newCode;
      this.$emit('change', newCode);
    }
  },
  computed: {
    code() {
      return this.value;
    },
    editor() {
      return this.$refs.myEditor.editor;
    }
  },
  mounted() {
    // console.log('this is current editor object', this.editor)
    // you can use this.editor to do something...
  },

  components: {
    OmCodeMirror
  }
};
</script>

<style>
.om-coder-edit {
  max-width: 100%;
  height: inherit;
}

.om-coder-edit__topbar {
  height: 50px;
  box-shadow: inset 0px -1px #dde1e6;
  color: #78909c;
  background-color: #f4f5f9;
  line-height: 50px;
  padding: 0 10px;
}

.om-coder-edit__topbar .file-info,
.om-coder-edit__topbar .file-tooltip {
  font-size: 13px;
  display: inline-block;
  overflow: hidden;
}

.om-coder-edit__topbar .file-info {
  width: 200px;
  border-right: 1px solid #c1c1c1;
}

.om-coder-edit__topbar .file-info .file-info-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 10px;
}

.om-coder-edit__topbar .file-tooltip {
  padding: 0 10px;
  position: absolute;
  right: 0;
  left: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.om-coder-edit__topbar .file-tooltip .file-tooltip-upload {
  color: #78909c;
  font-weight: bold;
  text-decoration: none;
}
</style>
