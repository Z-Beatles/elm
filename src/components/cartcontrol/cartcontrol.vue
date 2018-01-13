<template>
  <div class="cartcontrol">
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart">
        <div class="inner icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="cart-increase icon-add_circle" @click.stop="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        // 添加派发事件，将dom对象作为事件参数传入
        this.$root.eventHub.$emit('cartcontrol.addCart', event.target);
      },
      decreaseCart() {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    position: relative
    width: 96px
    height: 24px
    font-size: 24px
    color: rgb(0, 160, 220)
    .cart-count
      position: absolute
      line-height: 24px
      font-size: 12px
      text-align: center
      width: 100%
      color: rgb(147, 153, 159)
    .cart-decrease
      position: absolute
      top: 0
      left: 0
      padding: 0 12px
      transition: all 0.25s linear
      .inner
        transition: all 0.25s linear
        transform: rotate(0)
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3d(30px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-increase
      position: absolute
      top: 0
      right: 0
      padding: 0 12px
</style>
