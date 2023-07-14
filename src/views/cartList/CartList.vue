<template>
  <div class="wrapper">
    <div class="title">我的全部购物车({{ finalyCartList.length }})</div>

    <div class="products" v-for="(item, index)  in  finalyCartList " :key="index">
      <div class="products__title">沃尔玛</div>
      <template v-for="(item1, index) in item " :key="item1.index">
        <div class="products__item" v-if="index < displayedItems">
          <img class="products__item__img" :src="item1.imgUrl" />
          <div class="products__item__detail">
            <h4 class="products__item__title">{{ item1.name }}</h4>
            <p class="products__item__price">
              <span class="products__item__price__yen">&yen;{{ item1.price }} x {{ item1.count }}</span>
              <span class="products__item__price__origin">&yen;{{ (item1.count * item1.price).toFixed(2) }}</span>
            </p>
          </div>
        </div>
      </template>
      <div class="products__btn">
        <span class="products__btn__text" @click="() => { handleDisplay(index, Object.keys(item)) }">共计{{
          Object.keys(item).length
        }}件 展开/收起</span>
      </div>
    </div>
  </div>
  <!-- 底栏 -->
  <Docker :currentIndex="1" />
</template>

<script>
import { useStore } from 'vuex'
import { ref } from 'vue'
import Docker from '../../components/Docker.vue'

export default {
  name: 'CartList',
  components: { Docker },
  setup () {
    const store = useStore()
    const cartList = store.state.cartList
    const finalyCartList = []

    console.log(cartList, 'cartlist1')
    console.log(cartList[1].shopName, 'cartlist2')
    for (const i in cartList) {
      finalyCartList.push(cartList[i].productList)
    }

    const displayedItems = ref(3)
    const handleDisplay = (idex, item) => {
      if (displayedItems.value === 3) {
        displayedItems.value = item.length + 1
      } else { displayedItems.value = 3 }
    }
    return { finalyCartList, handleDisplay, displayedItems }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.wrapper {
  //纵向滚动
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: .5rem;
  background: #f8f8f8;
}

.title {
  line-height: .44rem;
  text-align: center;
  font-size: .16rem;
  color: #333;
  background: #fff;
}

.products {
  overflow-y: scroll;
  position: relative;
  margin: .16rem .18rem .1rem .18rem;
  background: $bgColor;

  &__title {
    position: relative;
    line-height: .22rem;
    padding: .16rem .16rem .16rem .16rem;
    font-size: .16rem;
    font-weight: bold;
    color: $content-fontcolor;
  }

  &__item {
    overflow-y: scroll;

    background: $bgColor;
    position: relative;
    display: flex;
    padding: 0 .16rem .16rem .16rem;

    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }

    &__detail {
      flex: 1;
    }

    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }

    &__price {
      display: flex;
      position: relative;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;

      &__yen {
        margin: .06rem 0 0 0;
        text-align: right;
      }

      &__origin {
        position: absolute;
        margin: .06rem 0 0 0;
        right: .16rem;
        text-align: left;
        color: #000;
      }
    }

  }

  &__btn {
    margin: 0 .18rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #FFFFFF;
    padding: 0 .16rem .16rem .16rem;

    &__text {
      display: block;
      line-height: .28rem;
      font-size: .14rem;
      color: #999999;
      text-align: center;
      background: #F5F5F5;
    }
  }

}
</style>
