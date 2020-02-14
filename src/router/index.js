import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', component: () => import('~/components/Main') },
      { path: '/page1', name: 'page1', component: () => import('~/components/Page1') },
      { path: '/page2', name: 'page2', component: () => import('~/components/Page2') },
    ],
  });
}
