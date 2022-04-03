import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import home_user from '../views/user/home_page.vue'
import homeuser from '../views/user/home.vue'
import home_bus from '../views/business/home_page.vue'
import LoginAdmin from '../views/admin/LoginAdmin.vue'
import favorite from '../views/user/favorite_page.vue'
import shopping from '../views/user/shoppingcart_page.vue'
import adminhome from "../views/admin/home_page.vue"

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/homeuser"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/post",
    name: 'post', component: () => import('../views/user/post.vue')
  },
  {
    path: "/homeuser",
    component: home_user,
    redirect: "/homeuser/home",
    children: [
      { path: "/homeuser/home", component: homeuser },
      {
        path: "/homeuser/news",
        name:'newsList',
        component: () => import('../views/user/news/newsList.vue'),

      },
      {
        path:"/homeuser/news/detail",
        name:'newsDetailPage',
        component: () => import('../views/user/news/newsDetailPage.vue')
      },
      { path: "/homeuser/store", name: 'store', component: () => import('../views/user/store.vue') },
      { path: "/homeuser/wares", name: 'wares', component: () => import('../views/user/wares.vue') },
      { path: "/homeuser/alone", name: 'alone', component: () => import('../views/user/alone.vue') },
      { path: "/homeuser/favorite", component: favorite },
      { path: "/homeuser/shopping", component: shopping },
      { path: "/homeuser/orderpage", name: 'order_page', component: () => import('../views/user/order/order_page.vue') },
      { path: "/homeuser/wish", name: 'wish', component: () => import('../views/user/wish_page.vue') },
      { path: "/homeuser/i_wish", name: 'i_wish', component: () => import('../views/user/personal/i_wish.vue') },
      {
        path: "/homeuser/personal", name: 'personal_page', component: () => import('../views/user/personal_page'), redirect: "/homeuser/personal/core",
        children: [
          { path: "/homeuser/personal/core", name: 'personal_core', component: () => import('../views/user/personal/core.vue') },
          { path: "/homeuser/personal/address", name: 'personal_address', component: () => import('../views/user/personal/address.vue') },
          { path: "/homeuser/personal/password", name: 'password', component: () => import('../views/user/personal/password.vue') },
          { path: "/homeuser/personal/iorder", name: 'iorder', component: () => import('../views/user/personal/iorder.vue') },
          { path: "/homeuser/personal/detailed", name: 'detailed', component: () => import('../views/user/personal/detailed.vue') }
        ]
      },
    ]
  },
  {
    path: "/homebus",
    component: home_bus
  },
  {
    path: "/loginadmin",
    component: LoginAdmin
  },
  {
    path: "/adminhome",
    component: adminhome,
    redirect: "/adminhome/home",
    children: [

      { path: "/adminhome/home", name: 'home', component: () => import('../components/admin/home.vue') },
      { path: "/adminhome/one_one", name: 'one_one', component: () => import('../views/admin/one/one_one.vue') },
      { path: "/adminhome/one_two", name: 'one_two', component: () => import('../views/admin/one/one_two.vue') },
      { path: "/adminhome/two_three", name: 'two_three', component: () => import('../views/admin/two/two_three.vue') },
      { path: "/adminhome/two_one", name: 'two_one', component: () => import('../views/admin/two/two_one.vue') },
      { path: "/adminhome/two_two", name: 'two_two', component: () => import('../views/admin/two/two_two.vue') },
      { path: "/adminhome/two_twoo", name: 'two_twoo', component: () => import('../views/admin/two/two_twoo.vue') },
      { path: "/adminhome/three_one", name: 'three_one', component: () => import('../views/admin/three/three_one.vue') },
      { path: "/adminhome/personal_page", name: 'personal_page', component: () => import('../views/admin/personal_page.vue'), },
      { path: "/adminhome/present_page", name: 'present_page', component: () => import('../views/admin/present_page.vue') },

      { path: "/adminhome/newsList", name: 'newsList', component: () => import('../views/admin/news/newsList.vue') },
      { path: "/adminhome/newsdetail", name: 'newsdetail', component: () => import('../views/admin/news/newsdetail.vue') },

      { path: "/adminhome/coursedetail", name: 'coursedetail', component: () => import('../views/admin/course/coursedetail.vue') },
      { path: "/adminhome/courseList", name: 'courseList', component: () => import('../views/admin/course/courseList.vue') },
      { path: "/adminhome/selection", name: 'selection', component: () => import('../views/admin/course/selection.vue') },
    ]
  }
]

const router = new VueRouter({
  routes
})
// router.beforeEach((to, from, next) => {
//   // console.log(to);
//
//   let isLogin = JSON.parse(localStorage.getItem("user"))
//   // //我在这里模仿了一个获取用户信息的方法
//   // let isLogin = window.sessionStorage.getItem('userInfo');
//   if (isLogin) {
//     //如果用户信息存在则往下执行。
//
//     next()
//   } else {
//     //如果用户token不存在则跳转到login页面
//     // console.log(to);
//
//     if (to.path === '/login' || to.path === '/post' || to.path === '/adminhome/home' || to.path === '/adminhome/one_one' || to.path === '/adminhome/one_two' || to.path === '/adminhome/two_three') {
//       next()
//     } else {
//       next('/login')
//     }
//   }
//   next()
// })
export default router
