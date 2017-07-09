<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <span class="star-wrapper">
              <v-star :size="36" :score="seller.serviceScore"></v-star>
            </span>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <span class="star-wrapper">
              <v-star :size="36" :score="seller.foodScore"></v-star>
            </span>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <v-ratingselect ref="ratingselect" :select-type="selectType" :only-content="onlyContent" :ratings="ratings" v-on:ratingtype_select="showRatingTypeSelect"
                      v-on:content_toggle="showContentToggle"></v-ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item border-1px" v-for="rating in ratings" v-show="needShow(rating.rateType,rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" alt="" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <v-star :size="24" :score="rating.score"></v-star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="recommendItem in rating.recommend">{{recommendItem }}</span>
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import star from 'components/star/star.vue';
  import split from 'components/split/split.vue';
  import ratingselect from 'components/ratingselect/ratingselect.vue';
  import {formatDate} from 'common/js/date.js';

  Vue.filter('formatDate', function(time) {
    let date = new Date(time);
    return formatDate(date, 'yyyy-MM-dd hh:mm');
  });

  const ALL = 2;
  const ERR_OK = 0;

  export default{
    name: 'ratings',
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: false
      };
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.ratings, {
              click: true
            });
          });
        }
      });
    },
    methods: {
      showRatingTypeSelect(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      showContentToggle(text) {
        this.onlyContent = text;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'v-star': star,
      'v-split': split,
      'v-ratingselect': ratingselect
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratings
    position absolute
    top 174px
    bottom 0px
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        width 137px
        border-right 1px solid rgba(7, 17, 27, 0.1)
        text-align center
        padding-bottom 6px
        padding-top 6px
        @media only screen and (max-width: 320px)
          flex 0 0 120px
          width 120px
        .score
          line-height 28px
          font-size 24px
          color rgb(255, 153, 0)
          margin-bottom 6px
        .title
          margin-bottom 8px
          line-height 12px
          font-size 12px
          color rgb(7, 17, 27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding-left 24px
        padding-top 6px
        padding-bottom 6px
        text-align center
        @media only screen and (max-width: 320px)
          padding-left 10px
        .score-wrapper
          margin-bottom 8px
          font-size 0
          text-align left
          .title
            display inline-block
            vertical-align top
            color rgb(7, 17, 27)
            font-size 12px
            line-height 18px
          .star-wrapper
            display inline-block
            vertical-align top
            margin 0 12px
            @media only screen and (max-width: 320px)
              margin 0 7px
          .score
            display inline-block
            vertical-align top
            font-size 12px
            color rgb(255, 153, 0)
            line-height 18px
        .delivery-wrapper
          font-size 0
          text-align left
          .title
            display inline-block
            color rgb(7, 17, 27)
            font-size 12px
            line-height 18px
          .delivery
            font-size 12px
            margin-left 12px
            color rgb(147, 153, 159)
            @media only screen and (max-width: 320px)
              margin-left 8px
    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex 0 0 28px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          flex 1
          position relative
          .name
            line-height 12px
            color rgb(7, 17, 17)
            font-size 10px
            margin-bottom 4px
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              vertical-align top
              margin-right 6px
            .delivery
              display inline-block
              vertical-align top
              font-size 10px
              color rgb(147, 153, 159)
          .text
            line-height 18px
            color rgb(7, 17, 17)
            font-size 12px
            margin-bottom 8px
          .recommend
            line-height 16px
            font-size 0
            .icon-thumb_up, .item
              display inline-block
              margin 0 8px 4px 0
              font-size 9px
            .icon-thumb_up
              color rgb(0, 160, 220)
            .item
              padding 0 6px
              border 1px solid rgba(7, 17, 27, .1)
              border-radius 1px
              color rgb(147, 153, 159)
              background #fff
          .time
            position absolute
            top 0px
            right 0px
            line-height 12px
            font-size 10px
            color rgb(147, 153, 159)

</style>
