<template>
  <div class="shopcart">
    <div class="shopcart-content" @click="toggleList">
      <div class="content-wrapper">
        <div class="content-flex">
          <div class="content-left">
            <div class="logo-wrapper">
              <div class="logo" :class="{highlight: totalCount>0}">
                <i class="icon-shopping_cart" :class="{highlight: totalCount>0}"></i>
              </div>
              <div class="num" v-show="totalCount>0">{{totalCount}}</div>
            </div>
            <div class="price" :class="{highlight: totalCount>0}">￥{{totalPrice}}</div>
            <div class="desc">另需配送配￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right" :class="payClass" @click.stop="pay">{{payDesc}}</div>
        </div>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food-item" v-for="food in selectFoods">
              <div class="details">
                <span class="name">{{food.name}}</span>
                <span class="price">￥{{food.price*food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <Cartcontrol @add="addFood" :food="food"></Cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mask" v-show="listShow" @click="toggleList"></div>
    </transition>
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import Cartcontrol from '@/components/cartcontrol/cartcontrol';

  export default {
    props: {
      // 购物车列表
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      // 配送费
      deliveryPrice: {
        type: Number,
        default: 0
      },
      // 起送费
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [{
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }],
        dropBalls: [],
        toggleStatus: false
      };
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diffPrice = this.minPrice - this.totalPrice;
          return `还差￥${diffPrice}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return `not-enough`;
        } else {
          return `enough`;
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.toggleStatus = false;
          return false;
        }
        let show = this.toggleStatus;
        if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      // 添加下落小球，需传入点击的元素用于计算小球动画初始位置
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      addFood(target) {
        this.drop(target);
      },
      beforeEnter(el) {
        let count = this.balls.length;
        for (let i = 0; i < count; i++) {
          let ball = this.balls[i];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 16;
            let y = -(window.innerHeight - rect.top - 45);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;// 触发重绘
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          // Vue为了知道过渡的完成，必须设置相应的事件监听器
          el.addEventListener('transitionend', done);
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }
        this.toggleStatus = !this.toggleStatus;
      },
      hideList() {
        this.toggleStatus = false;
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0;
        });
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }
        console.log(this.selectFoods);
        console.log('总计：' + this.totalPrice + '元');
      }
    },
    components: {
      Cartcontrol
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .shopcart
    position: fixed
    bottom: 0
    left: 0
    z-index: 99
    width: 100%
    height: 48px
    .shopcart-content
      position: absolute
      bottom: 0
      left: 0
      z-index: 99
      width: 100%
      background: #141d27
      color: rgba(255, 255, 255, 0.4)
      .content-wrapper
        position: relative
        width: 100%
        height: 100%
        .content-flex
          display: flex
          .content-left
            display: flex
            align-items: center
            flex: 1
            .logo-wrapper
              position: absolute
              top: -8px
              width: 44px
              height: 44px
              padding: 6px
              margin: 0 12px
              background: #141d27
              border-radius: 50%
              .logo
                width: 100%
                height: 100%
                text-align: center
                background: #2b343c
                border-radius: 50%
                &.highlight
                  background: rgb(0, 160, 220)
                .icon-shopping_cart
                  line-height: 44px
                  font-size: 24px
                  &.highlight
                    color: #fff
              .num
                position: absolute
                top: 0
                right: 0
                width: 24px
                height: 16px
                line-height: 16px
                text-align: center
                border-radius: 16px
                font-size: 9px
                font-weight: 700
                color: #fff
                background: rgb(240, 20, 20)
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                &.highlight
                  background: rgb(0, 160, 220)
                .icon-shopping_cart
                  line-height: 44px
                  font-size: 24px
                  &.highlight
                    color: #fff
            .price
              line-height: 24px
              font-size: 16px
              font-weight: 700
              border-right: 1px solid rgba(255, 255, 255, 0.1)
              padding-left: 80px
              padding-right: 12px
              &.highlight
                color: #fff
            .desc
              height: 12px
              line-height: 12px
              overflow: hidden
              font-size: 12px
              padding-left: 12px
          .content-right
            flex: 0 0 105px
            height: 48px
            line-height: 48px
            font-size: 12px
            text-align: center
            font-weight: 700
            &.not-enough
              background: #2b333b
            &.enough
              background: #00b43c
              color: #fff
    .shopcart-list
      position: absolute
      left: 0
      bottom: 48px
      width: 100%
      transition: all 0.3s
      &.fold-enter, &.fold-leave-to
        transform: translateY(293px)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)
      .list-content
        padding: 0 18px
        max-height: 245px
        overflow: hidden
        background: #fff
        .food-item
          display: flex
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
          .details
            display: flex
            justify-content: space-between
            flex: 1
            .name
              line-height: 48px
              font-size: 14px
              color: rgb(7, 17, 27)
            .price
              line-height: 48px
              font-size: 14px
              font-weight: 700
              color: rgb(240, 20, 20)
    .list-mask
      position: fixed
      z-index: -1
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, 0.6)
      backdrop-filter: blur(10px)
      transition: all 0.2s
      &.fade-enter, &.fade-leave-to
        opacity: 0
    .ball-container
      .ball
        position: fixed
        z-index: 99
        left: 32px
        bottom: 26px
        transition: all 0.4s cubic-bezier(.46, -0.59, .82, .51)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
</style>
