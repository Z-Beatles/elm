<template>
  <transition name="move">
    <div class="food-wrapper" ref="foodWrapper" v-show="showFlag">
      <div class="food-content">
        <div class="header">
          <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="extra">
              <span class="count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now"><span class="symbol">￥</span>{{food.price}}</span><span
              class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
          </div>
          <div class="cartcontrol-wrapper">
            <Cartcontrol :food="food"></Cartcontrol>
          </div>
          <transition name="faded">
            <div class="btn-buy" v-show="!food.count || food.count===0" @click="addFirst">加入购物车</div>
          </transition>
        </div>
        <div class="food-info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <div class="info">{{food.info}}</div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  import BScroll from 'better-scroll';
  import Cartcontrol from '@/components/cartcontrol/cartcontrol';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      };
    },
    methods: {
      show() {
        this.showFlag = true;

        this.$nextTick(() => {
          this._initScroll();
        });
      },
      _initScroll() {
        if (!this.foodScroll) {
          this.foodScroll = new BScroll(this.$refs.foodWrapper, {
            click: true
          });
        } else {
          this.foodScroll.refresh();
        }
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
        // 添加派发事件,显示小球动画
        this.$root.eventHub.$emit('cart.add', event.target);
      }
    },
    components: {
      Cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food-wrapper
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    z-index: 98
    width: 100%
    background: #f3f5f7
    transition: all 0.3s linear
    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0)
    .food-content
      .header
        position: relative
        background: #fff
        margin-bottom: 16px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        box-shadow: -2px 2px 8px rgba(7, 17, 27, 0.3)
        .image-header
          position: relative
          width: 100%
          height: 0
          padding-top: 100%
          img
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
          .back
            position: absolute
            top: 10px
            left: 10px
            background: radial-gradient(rgba(7, 17, 27, 0.1), rgba(7, 17, 27, 0.3))
            border-radius: 50%
            .icon-arrow_lift
              display: block
              padding: 10px
              font-size: 20px
              color: #fff
        .content
          padding: 18px
          .title
            line-height: 14px
            margin-bottom: 8px
            font-size: 14px
            font-weight: 700
            color: rgb(7, 17, 27)
          .extra
            margin-bottom: 18px
            line-height: 10px
            font-size: 0
            .count, .rating
              font-size: 10px
              color: rgb(147, 153, 159)
            .count
              margin-right: 12px
          .price
            font-weight: 700
            .now
              font-size: 14px
              color: rgb(240, 20, 20)
              margin-right: 8px
              .symbol
                font-size: 10px
            .old
              font-size: 10px
              color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          bottom: 18px
          right: 6px
        .btn-buy
          position: absolute
          z-index: 99
          bottom: 18px
          right: 18px
          width: 74px
          height: 24px
          line-height: 24px
          background: rgb(0, 160, 220)
          border-radius: 12px
          color: rgb(255, 255, 255)
          font-size: 10px
          text-align: center
          transition: all 0.2s linear
          &.faded-enter, &.faded-leave-to
            opacity: 0
      .food-info
        padding: 18px
        background: #fff
        border-top: 1px solid rgba(7, 17, 27, 0.1)
        margin-bottom: 16px
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        box-shadow: -2px 2px 8px rgba(7, 17, 27, 0.3)
        .title
          font-size: 14px
        .info
          padding: 6px 8px 0 8px
          font-size: 12px
          font-weight: 200
          color: rgb(77, 85, 93)
          line-height: 24px
</style>
