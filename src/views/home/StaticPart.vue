<!-- 首页上半布部分 -->
<template>
  <div class="position">
    <span class="iconfont position__icon">&#xe736;</span>
    电子科技大学成都学院
    <span class="iconfont position__notice">&#xe623;</span>
  </div>
  <div class="search">
    <div class="search__content">
      <span class="search__content__icon iconfont">&#xe62d;</span>
      <input class="search__content__input" placeholder="山姆会员商店优惠商品" />
    </div>
  </div>
  <div class="banner">
    <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" />
  </div>
  <div class="icons">
    <div class="icons__item" v-for="item in staticpartList" :key="item.desc">
      <img class="icons__item__img" :src="`http://www.dell-lee.com/imgs/vue3/${item.imgUrl}.png`" />
      <p class="icons__item__desc">{{ item.desc }}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const staticpartList = [
      { imgUrl: '超市', desc: '超市便利' },
      { imgUrl: '菜市场', desc: '菜市场' },
      { imgUrl: '水果店', desc: '水果店' },
      { imgUrl: '鲜花', desc: '鲜花绿植' },
      { imgUrl: '医药健康', desc: '医药健康' },
      { imgUrl: '家居', desc: '家居时尚' },
      { imgUrl: '蛋糕', desc: '蛋糕烘培' },
      { imgUrl: '签到', desc: '签到' },
      { imgUrl: '大牌免运', desc: '大牌免运' },
      { imgUrl: '红包', desc: '红包套餐' }
    ]
    return { staticpartList }
  }
}
</script>
<style lang="scss" scoped>
// 颜色引用
@import "../../style/viriables.scss";
// 省略文字
@import "../../style/mixins.scss";

.position {
  box-sizing: border-box;
  position: relative;
  padding: .16rem .24rem .16rem 0;
  line-height: .22rem;
  font-size: .16rem;
  color: $content-fontcolor;
  // 省略文字
  @include ellipsis;

  .position__icon {
    position: relative;
    top: .03rem;
    margin-right: .1rem;
    font-size: .2rem;
  }

  .position__notice {
    position: absolute;
    right: 0;
    margin-top: .02rem;
    font-size: .2rem;
  }
}

.search {
  display: flex;
  margin-bottom: .12rem;
  line-height: .32rem;

  &__content {
    display: flex;
    flex: 1;
    background: $search-bgColor;
    border-radius: .16rem;
    color: $search-fontColor;

    &__icon {
      margin-top: .03rem;
      width: .44rem;
      text-align: center;
    }

    &__input {
      display: block;
      width: 100%;
      padding-right: .2rem;
      border: none;
      outline: none;
      background: none;
      height: .32rem;
      font-size: .14rem;
      color: $content-fontcolor;

      &::placeholder {
        color: $search-fontColor;
      }
    }
  }
}

.banner {
  //防止抖动（撑开图片的高度）
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;

  &__img {
    width: 100%;
  }
}

.icons {
  //弹性布局
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;

  &__item {
    width: 20%;

    &__img {
      display: block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto;
    }

    &__desc {
      margin: .06rem 0 .16rem 0;
      text-align: center;
      color: $content-fontcolor;
    }
  }
}

.gap {
  margin: 0 -.18rem;
  height: .1rem;
  background: $content-bgColor;
}
</style>
