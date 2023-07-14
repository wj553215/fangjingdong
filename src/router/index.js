import { createRouter, createWebHashHistory } from 'vue-router'
// 同步组件 全部加载
import Login from '../views/login/Login'
import Register from '../views/register/Register'
const routes = [
  {
    path: '/',
    name: 'Home',
    // 异步组件只访问时加载
    component: () => import(/* webpackChunkName: "hemo" */ '../views/home/Home.vue')
  },
  {
    // 商家详情
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop.vue')
  },
  {
    // 订单
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList.vue')
  },
  {
    // 购物车
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderList.vue')
  },
  {
    // 我的
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "My" */ '../views/my/My.vue')
  },
  {
    // 确认订单
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // beforeEnter访问Login这个也面前才会执行
    beforeEnter (to, from, next) {
      // 真执行前面假执行后面
      // const {isLogin}= localStorage;
      localStorage.isLogin ? next({ name: 'Home' }) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter (to, from, next) {
      localStorage.isLogin ? next({ name: 'Home' }) : next()
    }
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// router.beforeEach 每次跳转前都会执行
// to 指跳转哪里的信息
// from 从哪里跳转来的信息
router.beforeEach((to, from, next) => {
  (localStorage.isLogin || (to.name === 'Login' || to.name === 'Register')) ? next() : next({ name: 'Login' })
})
export default router
