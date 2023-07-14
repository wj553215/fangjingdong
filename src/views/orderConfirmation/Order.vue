<template>
  <div class="order">
    <div class="order__price">实付金额<b>&yen; {{ calculations.price }}</b></div>
    <div class="order__btn" @click="handleOrder">提交订单</div>
  </div>
  <div class="mask" v-if="order">
    <div class="mask__content">
      <h3 class="mask__content__title">确认要离开收银台？</h3>
      <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--first" @click="() => handleConfremOrder(false)">取消订单
        </div>
        <div class="mask__content__btn mask__content__btn--last" @click="() => handleConfremOrder(true)">确认支付</div>
      </div>
    </div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'
import { ref } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

// 提交弹窗
const useShowOrderEffec = () => {
  const order = ref(false)
  const handleOrder = () => {
    order.value = !order.value
  }
  return { handleOrder, order }
}

// 提交订单相关逻辑
const useMakeOrderEffec = (shopId, shopName, productList, showToast, handleOrder) => {
  const store = useStore()
  const router = useRouter()
  const handleConfremOrder = async (isCanceled) => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product._id, 10), mun: product.count })
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        // 告诉路由登录后从新跳转
        if (isCanceled) {
          router.push({ name: 'OrderList' })
          store.commit('clearCartData', shopId)
        } else { handleOrder() }
      } else { showToast('下单失败') }
    } catch (errno) {
      showToast('请求失败')
    }
  }
  return { handleConfremOrder }
}
export default {
  name: 'Order',
  components: { Toast },
  setup () {
    const route = useRoute()
    const shopId = parseInt(route.params.id, 10)
    const { calculations, shopName, productList } = useCommonCartEffect(shopId)
    const { show, toastMessage, showToast } = useToastEffect()
    const { handleOrder, order } = useShowOrderEffec()
    const { handleConfremOrder } = useMakeOrderEffec(shopId, shopName, productList, showToast, handleOrder)
    return { show, toastMessage, calculations, handleOrder, order, handleConfremOrder }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: $bgColor;

  &__price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: $content-fontcolor;
  }

  &__btn {
    width: .89rem;
    background: #4FB0F9;
    font-size: .14rem;
    color: $bgColor;
    text-align: center;
  }
}

.mask {
  z-index: 2;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.50);

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.57rem;
    background: #fff;
    border-radius: .04rem;
    text-align: center;

    &__title {
      margin-top: .24rem;
      margin-bottom: 0;
      line-height: .26rem;
      font-size: .18rem;
      color: #333;
    }

    &__desc {
      margin-top: .08rem;
      line-height: .21rem;
      font-size: .14rem;
      color: #666;
    }

    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }

    &__btn {
      flex: 1;
      width: .8rem;
      line-height: .32rem;
      font-size: .14rem;
      border-radius: .16rem;

      &--first {
        margin-right: .24rem;
        border: .01rem solid #4FB0F9;
        color: #0091FF;
      }

      &--last {
        background: #4FB0F9;
        color: #fff;
      }
    }
  }
}
</style>
