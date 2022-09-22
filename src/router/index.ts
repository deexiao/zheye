import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import ColumnDetail from '../views/ColumnDetail.vue';
import CreatePost from '../views/CreatePost.vue';
import { useStore } from '@/stores/index';

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { redirectAlreadyLogin: true }
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: { requiredLogin: true }
    },
    {
      // 动态路径参数 ：标记
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    }
  ]
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  if (to.meta.requiredLogin && !store.user.isLogin) {
    next({ name: 'login' });
  } else if (to.meta.redirectAlreadyLogin && store.user.isLogin) {
    next('/');
  } else {
    next();
  }
});

export default router;
