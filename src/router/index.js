import Vue from 'vue' 
import Router from 'vue-router'
Vue.use(Router)
// import  Login from  "../views/login.vue"
const   Home =()=>import("../views/home.vue");
const   Login =()=>import("../views/login.vue");
const   User =()=>import("../views/user/User.vue");
let router = new Router({
  mode:"history",
  routes: [
    {
      path: '',
      redirect:"/login"
    },
    {
      path:"/login",
      component:Login
    },
    {
      path:"/home",
      component:Home,
      redirect:"/users",
      children:[
          {path:"/users",component:User },
          {path:"/roles",component:{template:`<div>角色路由</div>`} },
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  // 从首页登陆
   if(to.path =="/login") return next()
     let token = window.sessionStorage.getItem("accessToken")
    //  从非首页登陆
     if(!token)  next("/login") 
     next()
})
export default router 