<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders" v-for="(item, index) in list" :key="index">
      <div class="order">
        <h3 class="order__title">{{ item.shopName }}</h3>
        <span class="order__status">{{ item.isCanceled ? '已取消' : '已下单' }}</span>
      </div>
      <div class="orders__titles">
        <div class="orders__titles__imgs">
          <img class="orders__titles__imgs__img" v-for="(innerItem, innerIndex) in item.products" :key="innerIndex"
            :src="innerItem.product.img">
        </div>
        <div class="orders__titles__info">
          <div class="orders__titles__info__price">¥{{ item.totalPirce }}</div>
          <div class="orders__titles__info__count">共{{ item.totalNumber }}件</div>
        </div>
      </div>
    </div>
  </div>
  <!-- 底栏 -->
  <Docker :currentIndex="2" />
</template>
<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import Docker from '../../components/Docker.vue'

// 订单列表逻辑
const useOrderListEffec = () => {
  const data = reactive({ list: [] })
  const getOrderList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const OrderList = result.data
      // totalNumber 总价计算 totalNumber件数计算
      OrderList.forEach((order) => {
        const products = order.products
        let totalPirce = 0
        let totalNumber = 0
        products.forEach((productItem) => {
          totalNumber += (productItem?.orderSales || 0)
          totalPirce += ((productItem?.product?.price * productItem?.orderSales) || 0)
        })
        order.totalPirce = totalPirce
        order.totalNumber = totalNumber
      })
      data.list = result.data
    }
  }
  getOrderList()
  const { list } = toRefs(data)
  return { list }
}
// 处理订单列表逻辑
export default {
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { list } = useOrderListEffec()
    return { list }
  }

}
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

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

.orders {
  line-height: 1.1rem;
  background: #fff;
  margin: .16rem .18rem 0 .18rem;

  .order {
    display: flex;
    margin: 0 .16rem;

    &__title {
      width: 50%;
      font-size: .16rem;
      color: #333;
      line-height: .22rem;
      text-align: left;
      margin: .16rem 0 .16rem 0;
      white-space: nowrap;
    }

    &__status {
      width: 50%;
      font-size: .14rem;
      color: #999;
      line-height: .20rem;
      text-align: right;
      margin: .16rem 0 .16rem 0;
      white-space: nowrap;
    }
  }

  &__titles {
    display: flex;
    line-height: .56rem;
    margin: 0 .16rem;

    &__imgs {
      display: flex;
      width: 2.12rem;
      margin-right: .3rem;

      &__img {
        display: block;
        width: .4rem;
        height: .4rem;
        margin: 0 .12rem .16rem 0;
      }
    }

    &__info {
      display: flex;
      width: .7rem;
      flex-direction: column;
      padding: 0;
      text-align: right;

      &__price {
        box-sizing: border-box;
        line-height: .2rem;
        font-size: .14rem;
        color: #E93B3B;
        margin-bottom: .04rem;
        @include ellipsis;

      }

      &__count {
        box-sizing: border-box;
        line-height: .14rem;
        font-size: .12rem;
        color: #333333;
        @include ellipsis;
      }
    }
  }
}
</style>
