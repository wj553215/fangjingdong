import { computed } from 'vue'
import { useStore } from 'vuex'
// 购物车相关逻辑
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId, productId, productInfo, num
    })
  }
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })

  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  const calculations = computed(() => {
    const result = { total: 0, price: 0, allChecked: true }
    const productList = cartList[shopId]?.productList
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        // 数量
        result.total += product.count
        // 总价
        if (product.check) {
          result.price += (product.count * product.price)
        }
        // 判断全选
        if (product.count > 0 && !product.check) {
          result.allChecked = false
        }
      }
    }
    result.price = result.price.toFixed(2)
    return result
  })
  return { cartList, changeCartItemInfo, productList, shopName, calculations }
}
