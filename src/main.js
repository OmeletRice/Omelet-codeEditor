// import Vue from 'vue'
// import Coder from './index'
// import VueI18n from 'vue-i18n'
// import messages from './i18n/index'

// Vue.use(VueI18n)

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#mpcoder',
//   template: '<Coder />',
//   components: { Coder },
//   i18n: new VueI18n({
//     locale: 'en_US',
//     messages: messages
//   })
// })

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './i18n/index'

import Coder from './index'

Vue.use(VueI18n)

Vue.config.productionTip = false

const CoderVue = Vue.extend(Coder)

let vm = null

class OmCoder {
  constructor(options) {
    this.options = options
  }

  init(el, options) {
    const code = (options && !!options.code) ? options.code : 'Enter you EMail Code...'
    vm = new CoderVue({
      data: {
        value: code
      },
      i18n: new VueI18n({
        locale: options.lang || 'en_US',
        messages: messages
      })
    })
    vm.$mount(el)
  }

  setcode(val) {
    vm.value = val
  }

  clear() {
    vm.value = ''
  }
}

var coder = new OmCoder()
coder.init('#mpcoder', {
  code: ''
})

console.log(coder)

window.OmCoder = OmCoder

module.exports = OmCoder
