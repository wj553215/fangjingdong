<!-- 附近店铺 -->
<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link v-for="item in nearbyList" :key="item._id" :to="`/Shop/${item._id}`">
      <ShopInfo :item="item" />
    </router-link>
    <!-- :item="item"将数据传出 -->
  </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'

const useNearbyListEffect = () => {
  // 接口数据
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data.length) {
      nearbyList.value = result.data
    }
    console.log(result)
  }
  return { nearbyList, getNearbyList }
}
export default {
  name: 'Nearby',
  // 引入ShopInfo
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
// 颜色引用
@import "../../style/viriables.scss";

.nearby {
  &__title {
    margin: .16rem 0 .14rem .18rem;
    font-size: .18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }

  a {
    text-decoration: none;
  }
}
</style>
