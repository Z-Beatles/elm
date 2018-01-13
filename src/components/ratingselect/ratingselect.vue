<template>
  <div class="ratingselect">
    <div class="rating-type">
      <div class="block all" :class="{active:selectType===2}" @click="selectRating(2,$event)">
        <span>{{desc.all}}</span>
        <span class="count">{{ratings.length}}</span>
      </div>
      <div class="block positive" :class="{active:selectType===0}" @click="selectRating(0,$event)">
        <span>{{desc.positive}}</span>
        <span class="count">{{positive.length}}</span>
      </div>
      <div class="block negative" :class="{active:selectType===1}" @click="selectRating(1,$event)">
        <span>{{desc.negative}}</span>
        <span class="count">{{negative.length}}</span>
      </div>
    </div>
    <div class="switch" :class="{on:onlyContent}" @click="toggleContent()">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;
  const NEGATIVE = 1;
  const All = 2;

  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: All
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positive() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negative() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      selectRating(type, event) {
        if (!event._constructed) {
          return;
        }
        // 发送selectRating事件
        this.$root.eventHub.$emit('ratingselect.selectRating', type);
      },
      toggleContent() {
        if (!event._constructed) {
          return;
        }
        // 发送toggleContent事件
        this.$root.eventHub.$emit('ratingselect.toggleContent');
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .ratingselect
    .rating-type
      padding-bottom: 18px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        border-radius: 1px
        line-height: 16px
        font-size: 12px
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        .count
          font-size: 8px
        &.all
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
    .switch
      display: flex
      align-items: center
      color: rgb(147, 153, 159)
      padding: 12px 0
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        padding-right: 4px
        font-size: 24px
      .text
        font-size: 12px
</style>
