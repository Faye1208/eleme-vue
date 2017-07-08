// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.{
import Vue from 'vue';
import Router from 'vue-router';
import Resource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods.vue';
import ratings from 'components/ratings/ratings.vue';
import sellers from 'components/sellers/sellers.vue';
import 'common/stylus/index.styl';

Vue.use(Router);
Vue.use(Resource);

const router = new Router({
  routes: [
    // {
    //   path: '/', component: goods    //将根目录指向goods
    // },
    {
      path: '/goods', component: goods
    },
    {
      path: '/ratings', component: ratings
    },
    {
      path: '/sellers', component: sellers
    }
  ],
  linkActiveClass: 'active'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

// 指向特殊页面
router.push('/goods');
