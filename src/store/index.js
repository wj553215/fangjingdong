import Vuex from 'vuex'

const setLocalCarList = (state) => {
  const { cartList } = state
  // 转化为字符串与json
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  // JSON.parse转化为对象
  const cartListString = localStorage.cartList || '{}'
  return JSON.parse(cartListString)
}

export default Vuex.createStore({
  state: {
    // {shopId: {shopName:'沃尔玛',productList:{productId: {} }}}
    cartList: getLocalCartList()
    // 第一层级是商铺的id
    // 第二层是商品id
    // 第二层内容是商品内容以及购物数量
    // shopId: {
    // shopName:'沃尔玛',
    // productList:{
    //   productId: {
    //     _id: '1',
    //     name: '番茄250g/份',
    //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    //     sales: 10,
    //     price: 33.6,
    //     oldPrice: 39.6,
    //     count: 2
    //   },
    // },
    // }
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      const { shopId, productId, productInfo } = payload
      // let shopInfo = state.cartList[shopId] || {}下两句可这样写
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) { shopInfo = { shopName: '', productList: {} } }
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count = product.count + payload.num
      if (payload.num > 0) { product.check = true }
      if (product.count < 0) { product.count = 0 }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      setLocalCarList(state)
    },
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      let shopInfo = state.cartList[shopId] // || { shopName: '', productList: {} }
      if (!shopInfo) { shopInfo = { shopName: '', productList: {} } }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCarList(state)
    },
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      setLocalCarList(state)
    },
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCarList(state)
    },
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
      setLocalCarList(state)
    },
    // { shopId }对象需要const { shopId } = payload先结构 shopId直接传不用
    clearCartData (state, shopId) {
      state.cartList[shopId].productList = {}
    }
  }
})
