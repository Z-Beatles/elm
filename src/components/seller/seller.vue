<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <div class="infos-wrapper">
          <div class="infos">
            <h1 class="name">{{seller.name}}</h1>
            <Star :size="36" :score="seller.score"></Star>
            <span class="rating-count">({{seller.ratingCount}})</span>
            <span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="favorite">
            <span class="icon-favorite"></span>
            <span class="text">已收藏</span>
          </div>
        </div>
        <div class="count">
          <div class="minPrice">
            <span class="text">起送价</span>
            <span class="number"><span class="large">{{seller.minPrice}}</span>元</span>
          </div>
          <div class="deliveryPrice">
            <span class="text">商家配送</span>
            <span class="number"><span class="large">{{seller.deliveryPrice}}</span>元</span>
          </div>
          <div class="deliveryTime">
            <span class="text">平均配送时间</span>
            <span class="number"><span class="large">{{seller.deliveryTime}}</span>分钟</span>
          </div>
        </div>
      </div>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <p class="text">{{seller.bulletin}}</p>
        <div class="supports">
          <ul>
            <li class="support-item" v-for="support in seller.supports">
              <div class="icon" :class="classMap[support.type]"></div>
              <div class="support">{{support.description}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrapper" ref="pics">
          <ul class="pics-list">
            <li class="pic" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <p class="item" v-for="info in seller.infos">{{info}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Star from '@/components/star/star';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    watch: {
      'seller'() {
        this.$nextTick(() => {
          this._initScroll();
          this._initPics();
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initScroll();
        this._initPics();
      });
    },
    methods: {
      _initScroll() {
        if (!this.sellerScroll) {
          this.sellerScroll = new BScroll(this.$refs.seller, {
            click: true
          });
        } else {
          this.sellerScroll.refresh();
        }
      },
      _initPics() {
        let list = document.querySelector('.pics-list');
        list.style.cssText = `width: ${list.scrollWidth}px`;
        this.$nextTick(() => {
          if (!this.picsScroll) {
            this.picsScroll = new BScroll(this.$refs.pics, {
              scrollX: true,
              eventPassthrough: 'vertical'
            });
          } else {
            this.picsScroll.refresh();
          }
        });
      }
    },
    components: {
      Star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .seller
    position: absolute
    overflow: hidden
    top: 174px
    bottom: 0
    width: 100%
    background: #f3f5f7
    .seller-content
      .overview
        padding: 0 18px
        background: #fff
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        box-shadow: -2px 2px 8px rgba(7, 17, 27, 0.3);
        margin-bottom: 16px
        .infos-wrapper
          display: flex
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .infos
            flex: 1
            font-size: 0
            padding: 18px 0
            .name
              font-size: 14px
              color: rgb(7, 17, 27)
              line-height: 14px
              margin-bottom: 8px
            .star
              display: inline-block
              height: 18px
              line-height: 18px
              vertical-align: middle
              margin-right: 8px
            .rating-count, .sell-count
              display: inline-block
              font-size: 10px
              color: rgb(77, 85, 93)
              height: 18px
              line-height: 18px
              vertical-align: middle
              &.rating-count
                margin-right: 12px
          .favorite
            flex: 0 0 50px
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            font-size: 0
            .icon-favorite
              display: block
              font-size: 24px
              line-height: 24px
              color: rgb(240, 20, 20)
              margin-bottom: 4px
            .text
              display: block
              font-size: 10px
              line-height: 10px
              color: rgb(77, 85, 93)
        .count
          display: flex
          padding: 18px 0
          .minPrice, .deliveryPrice, .deliveryTime
            flex: 1
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            .text
              display: block
              font-size: 10px
              color: rgb(147, 153, 159)
              line-height: 10px
              margin-bottom: 4px
            .number
              display: block
              font-size: 10px
              .large
                font-size: 24px
      .bulletin
        padding: 18px 18px 0 18px
        background: #fff
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        box-shadow: -2px 2px 8px rgba(7, 17, 27, 0.3);
        margin-bottom: 16px
        .title
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
          margin-bottom: 8px
        .text
          padding: 8px 12px 6px 12px
          font-size: 12px
          color: rgb(240, 20, 20)
          line-height: 24px
        .supports
          .support-item
            display: flex
            align-items: center
            padding: 16px 12px
            font-size: 0
            border-top: 1px solid rgba(7, 17, 27, 0.1)
            .icon
              width: 16px
              height: 16px
              margin-right: 6px
              background-size: 16px 16px
              background-repeat: no-repeat
              &.decrease
                bg-image('decrease_4')
              &.discount
                bg-image('discount_4')
              &.special
                bg-image('special_4')
              &.invoice
                bg-image('invoice_4')
              &.guarantee
                bg-image('guarantee_4')
            .support
              font-size: 12px
              color: rgb(7, 17, 27)
      .pics
        padding: 18px 0 18px 18px
        background: #fff
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        box-shadow: -2px 2px 8px rgba(7, 17, 27, 0.3);
        margin-bottom: 16px
        .title
          font-size: 14px
          line-height: 14px
          color: rgb(7, 17, 27)
          margin-bottom: 12px
        .pics-wrapper
          width: 100%
          overflow: hidden
          white-space: nowrap
          .pics-list
            display: flex
            flex-direction: row
            .pic
              margin-right: 6px
              width: 120px
              height: 90px
              &:last-child
                margin-right: 0
      .info
        padding: 0 18px
        background: #fff
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        box-shadow: -2px 2px 8px rgba(7, 17, 27, 0.3);
        margin-bottom: 16px
        .title
          padding-top: 18px
          font-size: 14px
          color: rgb(7, 17, 27)
          line-height: 14px
          margin-bottom: 12px
        .item
          font-size: 12px
          color: rgb(7, 17, 27)
          line-height: 16px
          padding: 16px 12px
          border-top: 1px solid rgba(7, 17, 27, 0.1)
</style>
