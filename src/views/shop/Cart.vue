<template>
  <div class="mask" v-if="showCart && calculations.total > 0" @click="handleCartShowChange" />
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <div class="product__header">
        <div class="product__header__all" @click="() => setCartItemsChecked(shopId)">
          <span class="product__header__icon iconfont" v-html="calculations.allChecked ? '&#xe601;' : '&#xe731;'">
          </span>
          全选
        </div>
        <div class="product__header__kong"></div>
        <div class="product__header__clear" @click="() => cleanCartProducts(shopId)">清空购物车</div>
      </div>
      <div class="product__item" v-for="item in productList" :key="item._id">
        <div class="product__item__checked iconfont" v-html="item.check ? '&#xe601;' : '&#xe731;'"
          @click="() => changeCartItemChecked(shopId, item._id)" />
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus iconfont" @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }">
            &#xe8b1;
          </span>
          {{ item.count || 0 }}
          <span class="product__number__plus iconfont"
            @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }">&#xe602;</span>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check__icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="check__icon__img" @click="handleCartShowChange" />
        <div class="check__icon__tag">{{ quantity.item }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{ calculations.price }}</span>
      </div>
      <div class="check__btn" v-if="calculations.price > 0">
        <router-link :to="{ path: `/orderConfirmation/${shopId}` }">
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 获取购物车信息逻辑
const useCartEffect = (shopId) => {
  const store = useStore()
  const { calculations, changeCartItemInfo, productList } = useCommonCartEffect(shopId)
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }

  const setCartItemsChecked = (shopId) => {
    store.commit('setCartItemsChecked', { shopId })
  }

  const quantity = computed(() => {
    const result = { item: 0 }
    for (const i in productList.value) {
      const product = productList.value[i]
      if (product.check) { result.item = result.item + 1 }
    }
    return result
  })

  return {
    calculations,
    productList,
    cleanCartProducts,
    changeCartItemInfo,
    changeCartItemChecked,
    setCartItemsChecked,
    quantity
  }
}
// 展示隐藏购物车
const toggleCarEffect = () => {
  const showCart = ref(false)
  // 显示购物车
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, handleCartShowChange } = toggleCarEffect()
    const {
      calculations, productList, cleanCartProducts, quantity,
      changeCartItemInfo, changeCartItemChecked, setCartItemsChecked
    } = useCartEffect(shopId)
    return {
      shopId,
      calculations,
      productList,
      showCart,
      quantity,
      cleanCartProducts,
      changeCartItemInfo,
      changeCartItemChecked,
      setCartItemsChecked,
      handleCartShowChange
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0, 0, 0, .5);
  // 图层1
  z-index: 1;
}

.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  // 图层2
  z-index: 2;
  background: $bgColor;
}

.product {
  overflow-y: scroll;
  flex: 1;
  background: $bgColor;

  &__header {
    display: flex;
    line-height: .52rem;
    border-bottom: .01rem solid $content-bgColor;
    font-size: .14rem;
    color: $content-fontcolor;

    &__all {
      width: .64rem;
      margin-left: .18rem;
    }

    &__icon {
      display: inline-block;
      margin-right: .1rem;
      vertical-align: top;
      color: $btn-bgColor;
      font-size: .2rem;
    }

    &__kong {
      width: 1rem;
      height: 100%;
    }

    &__clear {
      flex: 1;
      margin-right: .16rem;
      text-align: right;
    }
  }

  &__item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;

    &__checked {
      line-height: .5rem;
      margin-right: .2rem;
      color: $btn-bgColor;
      font-size: .2rem;
    }

    &__detail {
      overflow: hidden;
    }

    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }

    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }

    &__price {
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
    }

    &__yen {
      font-size: .12rem;
    }

    &__origin {
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }

    .product__number {
      position: absolute;
      right: 0;
      bottom: .12rem;
      line-height: .18rem;

      &__minus {
        position: relative;
        top: .02rem;
        color: $medium-fontColor;
        margin-right: .05rem;
      }

      &__plus {
        position: relative;
        top: .02rem;
        color: $btn-bgColor;
        margin-left: .05rem;
      }
    }
  }
}

.check {
  display: flex;
  height: .49rem;
  bottom: 0;
  border-top: .01rem solid $content-bgColor;
  line-height: .49rem;

  &__icon {
    position: relative;
    width: .84rem;

    &__img {
      display: block;
      margin: .12rem auto;
      width: .28rem;
      height: .26rem;
    }

    &__tag {
      position: absolute;
      left: .46rem;
      top: .04rem;
      padding: 0 .04rem;
      min-width: .2rem;
      height: .2rem;
      line-height: .2rem;
      background-color: $hightlight-fontColor;
      border-radius: .1rem;
      font-size: .12rem;
      text-align: center;
      color: $bgColor;
      transform: scale(.5);
      //缩小时以左侧中间为中心
      transform-origin: left center;
    }
  }

  &__info {
    flex: 1;
    color: $content-fontcolor;
    font-size: .12rem;

    &__price {
      line-height: .49rem;
      color: $hightlight-fontColor;
      font-size: .18rem;
    }
  }

  &__btn {
    width: .98rem;
    background-color: #4FB0F9;
    text-align: center;
    font-size: .14rem;

    a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}
</style>
