<template>
  <div class="products">
    <div class="products__title">{{ shopName }}</div>
    <div class="products__list">
      <template v-for="(item, index) in  productList " :key="item._id">
        <div class="products__item" v-if="item.check && index < displayedItems">
          <img class="products__item__img" :src="item.imgUrl" />
          <div class="products__item__detail">
            <h4 class="products__item__title">{{ item.name }}</h4>
            <p class="products__item__price">
              <span class="products__item__yen">&yen;{{ item.price }} x {{ item.count }}</span>
              <span class="products__item__origin">&yen;{{ (item.price * item.count).toFixed(2) }}</span>
            </p>
          </div>
        </div>
      </template>
      <div class="products__list__btn">
        <span class="products__list__btn__text" @click="handleDisplay">共计{{ quantity.item }}件/1.4kg</span>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useCommonCartEffect } from '../../effects/cartEffects'

export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)

    const quantity = computed(() => {
      const result = { item: 0, displayedItems: 1 }
      for (const i in productList.value) {
        const product = productList.value[i]
        result.displayedItems = result.displayedItems + 1
        if (product.check) { result.item = result.item + 1 }
      }
      return result
    })

    const displayedItems = ref(3)
    const handleDisplay = () => {
      if (displayedItems.value === 3) {
        displayedItems.value = quantity.value.displayedItems
      } else { displayedItems.value = 3 }
    }
    return { productList, shopName, quantity, handleDisplay, displayedItems }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.products {
  margin: .16rem .18rem .1rem .18rem;
  background: $bgColor;

  &__title {
    position: relative;
    line-height: 100%;
    padding: .16rem .16rem .16rem .16rem;
    font-size: .16rem;
    color: $content-fontcolor;
  }

  &__list {
    overflow-y: scroll;
    position: absolute;
    margin: 0 .18rem;
    left: 0;
    right: 0;
    bottom: .6rem;
    top: 2.39rem;

    &__btn {
      position: relative;
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

  &__item {
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
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
    }

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
</style>
