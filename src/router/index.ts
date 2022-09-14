import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ColumnDetail from '../views/ColumnDetail.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      // 动态路径参数 ：标记
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    }
  ]
});

export default router;
