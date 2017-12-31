<template>
  <div class="goods">
    <div class="menu-wrapper">菜单</div>
    <div class="foods-wrapper">列表</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .goods
    display: flex
    position: absolute
    overflow: hidden
    top: 174px
    bottom: 46px
    width: 100%
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
    .foods-wrapper
      flex: 1
</style>
