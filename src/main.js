// 默认指向node_module中dist/vue.runtime.common.js
import Vue from 'vue' //改变指向，让其能解析template模块
import router from './router/index'
import App from './App.vue'


// window.$loading = Loading
// window.$confirm = MessageBox.confirm
Vue.config.productionTip = false
/* eslint-disable no-new */
// 引入图标
// import '@/assets/iconfont/iconfont.css'
import '@/assets/fonts/iconfont.css'
//引入 element组件 
import "./useCompoent"


//引入elemnet样式
import 'element-ui/lib/theme-chalk/index.css';

import axios from "axios"
// 根路径
axios.defaults.baseURL = "http://127.0.0.1:7000/"
// 请求拦截器，在发送请求之前触发，req对象包含请求的url，请求的方式，请求头
axios.interceptors.request.use(req => {
  req.headers.Authorization = window.sessionStorage.getItem("accessToken")
  //拦截放行
  return req;
})
// 将其给Vue的属性，root根组件，这样所有的组件都能使用$http,如果是路由就上原型的原型去找，如果是App到原型去找就可以了
Vue.prototype.$http = axios


// vuerouter中的组件引用 
var test = new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


// console.log(test.$http);
