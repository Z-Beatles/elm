<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <p class="score">{{seller.score}}</p>
          <p class="title">综合评分</p>
          <p class="rank-rate">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <p class="title">服务态度</p>
            <Star :size="36" :score="seller.serviceScore"></Star>
            <p class="score">{{seller.serviceScore}}</p>
          </div>
          <div class="score-wrapper">
            <p class="title">食物评分</p>
            <Star :size="36" :score="seller.foodScore"></Star>
            <p class="score">{{seller.foodScore}}</p>
          </div>
          <div class="delivery-wrapper">
            <p class="title">送达时间</p>
            <p class="delivery">{{seller.deliveryTime}}分钟</p>
          </div>
        </div>
      </div>
      <div class="ratingselect-wrapper">
        <Ratingselect @select="selectRating" @toggle="toggleContent" :ratings="ratings"
                      :selectType="selectType" :onlyContent="onlyContent"></Ratingselect>
      </div>
      <div class="ratings-wrapper">
        <ul>
          <li class="rating-item" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <span class="time">{{rating.rateTime | formatDate}}</span>
              <h1 class="username">{{rating.username}}</h1>
              <div class="star-wrapper">
                <Star :size="24" :score="rating.score"></Star>
                <span class="delivery" v-if="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-if="rating.recommend && rating.recommend.length>0">
                <span class="icon-thumb_up"></span>
                <span class="recommend-item" v-for="item in rating.recommend">{{item}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Star from '@/components/star/star';
  import Ratingselect from '@/components/ratingselect/ratingselect';
  import {formateDate} from '@/common/js/date';

  const ERR_OK = 0;
  const All = 2;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: [],
        selectType: All,
        onlyContent: true
      };
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.ratings = response.data;
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      });
    },
    methods: {
      _initScroll() {
        this.ratingScroll = new BScroll(this.$refs.ratings, {
          click: true
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === All) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
      selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.ratingScroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.ratingScroll.refresh();
        });
      }
    },
    filters: {
      formatDate(timeStamp) {
        let date = new Date(timeStamp);
        return formateDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      Star,
      Ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .ratings
    position: absolute
    top: 174px
    bottom: 0
    width: 100%
    overflow: hidden
    background: #f3f5f7
    .ratings-content
      background: #fff
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      box-shadow: -2px 2px 8px rgba(7, 17, 27, 0.3);
      .overview
        display: flex
        padding: 18px 0
        .overview-left
          flex: 0 0 137px
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          text-align: center
          @media only screen and (max-width: 320px)
            flex: 0 0 110px
          .score
            font-size: 24px
            color: rgb(255, 153, 0)
            line-height: 28px
            padding-top: 2px
          .title
            font-size: 12px
            line-height: 12px
            color: rgb(7, 17, 27)
            padding: 6px 0 8px 0
          .rank-rate
            font-size: 10px
            line-height: 10px
            color: rgb(147, 153, 159)
            padding-bottom: 6px
        .overview-right
          flex: 1
          padding-left: 24px
          @media only screen and (max-width: 320px)
            padding-left: 8px
          .score-wrapper
            padding-bottom: 8px
            font-size: 0
            .title
              display: inline-block
              line-height: 18px
              vertical-align: middle
              font-size: 12px
              color: rgb(7, 17, 27)
            .star
              display: inline-block
              height: 18px
              line-height: 18px
              vertical-align: middle
              padding: 0 12px
            .score
              display: inline-block
              line-height: 18px
              vertical-align: middle
              font-size: 12px
              color: rgb(255, 153, 0)
          .delivery-wrapper
            padding-bottom: 8px
            font-size: 0
            .title
              display: inline-block
              line-height: 18px
              font-size: 12px
              color: rgb(7, 17, 27)
            .delivery
              display: inline-block
              line-height: 18px
              font-size: 12px
              color: rgb(147, 153, 159)
              padding-left: 12px
    .ratingselect-wrapper
      padding: 0 18px
    .ratings-wrapper
      padding: 18px
      .rating-item
        display: flex
        padding: 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        .avatar
          flex: 0 0 28px
          margin-right: 12px
          img
            border-radius: 50%
        .content
          flex: 1
          .time
            float: right
            font-size: 10px
            color: rgb(147, 153, 159)
          .username
            font-size: 10px
            line-height: 12px
            color: rgb(7, 17, 27)
            margin-bottom: 6px
          .star-wrapper
            margin-bottom: 6px
            font-size: 0
            .star
              display: inline-block
              height: 12px
              line-height: 12px
              margin-right: 6px
            .delivery
              display: inline-block
              font-size: 10px
              line-height: 12px
              color: rgb(147, 153, 159)
          .text
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
            margin-bottom: 8px
          .recommend
            line-height: 16px
            .icon-thumb_up
              font-size: 12px
              color: rgb(0, 160, 220)
            .recommend-item
              display: inline-block
              font-size: 9px
              color: rgb(147, 153, 159)
              line-height: 16px
              border: 1px solid rgba(7, 17, 27, 0.1)
              border-radius: 2px
              padding: 0 6px
              margin: 0 8px 3px 0
</style>
