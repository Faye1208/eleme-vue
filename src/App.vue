<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/sellers">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import header from 'components/header/header.vue';
  import {urlParse} from 'common/js/util.js';

  const ERR_OK = 0;

  export default {
    name: 'app',
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            console.log(queryParam);
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
//        console.log(response);
//        console.log(response.body);
//        console.log(response.data);
        response = response.body;
      if (response.errno === ERR_OK) {
//        扩展属性前：
//        this.seller = response.data;
//        扩展属性后：
        this.seller = Object.assign({}, this.seller, response.data);
        console.log(this.seller.id);
      }
    })
      ;
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  #app
    .tab-wrapper
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
        & .active
          color: rgb(240, 20, 20)
</style>
