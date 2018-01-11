<template>
  <transition name="move">
    <div class="food" v-show="showFlag"></div>
  </transition>

</template>

<script type="text/ecmascript-6">
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
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    top: 0
    left: 0
    bottom: 48px
    z-index: 98
    width: 100%
    background: #fff
    transition: all 0.3s linear
    &.move-enter, &.move-leave-to
      transform: translate3d(100%, 0, 0)
</style>
