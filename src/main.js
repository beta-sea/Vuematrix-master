// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'
import vDialogs from 'v-dialogs'
import axios from 'axios'
import store from './stores'
import 'xe-utils'
import VueCropper from 'vue-cropper'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
import moment from 'moment'
import 'moment/locale/zh-cn'

import './assets/icons' // icon
import './comm/authority' // permission access control

moment.locale('zh-cn')
Vue.prototype.$moment = moment // 赋值使用
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(Antd)
Vue.use(vDialogs)
Vue.use(VXETable)
Vue.use(VueCropper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  mounted () {
  }
})
