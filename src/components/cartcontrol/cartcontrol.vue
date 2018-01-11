<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart">
        <div class="inner icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click="addCart"></div>
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
        this.$root.eventHub.$emit('cart.add', event.target);
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
    display: flex
    position: relative
    font-size: 24px
    color: rgb(0, 160, 220)
    .cart-decrease
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
    .cart-count
      z-index: -1
      position: absolute
      line-height: 24px
      font-size: 12px
      text-align: center
      width: 100%
      color: rgb(147, 153, 159)
    .cart-increase
      padding: 0 12px
      z-index: 99
</style>
