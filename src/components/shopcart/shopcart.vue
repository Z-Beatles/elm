<template>
  <div class="shopcart">
    <div class="content">
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
      <div class="content-right" :class="payClass">{{payDesc}}</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
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
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 99
    width: 100%
    background: #141d27
    .content
      display: flex
      align-items: center
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        display: flex
        align-items: center
        height: 48px
        .logo-wrapper
          position: relative
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
        .price
          line-height: 24px
          font-size: 16px
          font-weight: 700
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          padding-right: 12px
          &.highlight
            color: #fff
        .desc
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
</style>
