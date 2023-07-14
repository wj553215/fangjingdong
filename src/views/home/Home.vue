<template>
  <div class="wrapper">
    <!-- 首页上半 -->
    <StaticPart />
    <!-- 附近店铺 -->
    <Nearby />
  </div>
  <!-- 底栏 -->
  <Docker :currentIndex="0" />
</template>

<script>
import StaticPart from './StaticPart.vue'
import Nearby from './Nearby.vue'
import Docker from '../../components/Docker.vue'
export default {
  name: 'Home',
  components: { StaticPart, Nearby, Docker }
}
</script>

<style lang="scss" scoped>
.wrapper {
  //纵向滚动
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: .5rem;
  padding: 0 .18rem .1rem .18rem;
}
</style>
