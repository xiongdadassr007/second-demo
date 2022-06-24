import Vue from 'vue'
import App from './App.vue'
import { Container, Header, Main, Footer, Button, InputNumber } from 'element-ui';
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Button)
Vue.use(InputNumber)

// 引入axios
import axios from "axios"
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
