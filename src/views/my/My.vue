<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__bg"></div>
      <div class="top__revise iconfont">&#xe690;</div>
      <div class="top__avatar">
        <img class="img" src="../../assets/2.jpg">
      </div>
      <div class="top__name">
        <div class="top__name__grade">
          <div class="top__name__grade__tatol">热心市民李先生</div>
          <div class="top__name__grade__text">
            <div class="icon iconfont">&#xe870;</div>
            <span class="text">16</span>
          </div>
        </div>
        <div class="top__name__id">ID: 1069643013</div>
      </div>
      <div class="top__welfares">
        <div class="top__welfares__item">
          <p class="top__welfares__item__text">红包</p>
          <p class="top__welfares__item__quantity">218</p>
        </div>
        <div class="top__welfares__item">
          <p class="top__welfares__item__text">优惠卷</p>
          <p class="top__welfares__item__quantity">12张</p>
        </div>
        <div class="top__welfares__item">
          <p class="top__welfares__item__text">鲜豆</p>
          <p class="top__welfares__item__quantity">88</p>
        </div>
        <div class="top__welfares__item">
          <p class="top__welfares__item__text">白条</p>
          <p class="top__welfares__item__quantity">1000</p>
        </div>
      </div>
    </div>
    <div class="manage">
      <div class="manage__option">
        <div class="manage__option__iconfont bgColor1 iconfont">&#xe606;</div>
        <div class="manage__option__text">我的钱包</div>
        <div class="manage__option__icon iconfont">&#xe600;</div>
      </div>
      <div class="manage__option">
        <div class="manage__option__iconfont bgColor2 iconfont">&#xebbb;</div>
        <div class="manage__option__text">我的地址</div>
        <div class="manage__option__icon iconfont">&#xe600;</div>
      </div>
      <div class="manage__option">
        <div class="manage__option__iconfont bgColor3 iconfont">&#xe605;</div>
        <div class="manage__option__text">客服与帮助</div>
        <div class="manage__option__icon iconfont">&#xe600;</div>
      </div>
    </div>
  </div>
  <!-- 底栏 -->
  <Docker :currentIndex="3" />
</template>
<script>
import Docker from '../../components/Docker.vue'
export default {
  name: 'My',
  components: { Docker }

}
</script>
<style lang="scss" scoped>
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: .5rem;
  background: #f8f8f8;

  .top {
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    height: 2.93rem;
    width: 100%;

    &__bg {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 2.16rem;
      width: 100%;
      background-size: 100% 2.16rem;
      // background-repeat: no-repeat;
      background-image: linear-gradient(239deg, #3A6FF3 0%, #50C7FB 100%);
      border-radius: 0 0 25% 25%;
    }

    &__revise {
      position: absolute;
      top: .41rem;
      right: .21rem;
      line-height: 0.19px;
      width: .24rem;
      color: #FFF;
    }

    &__avatar {
      position: absolute;
      z-index: 1;
      top: .44rem;
      left: 1.41rem;
      width: .94rem;
      height: .94rem;

      .img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        color: red;
      }
    }

    &__name {
      position: relative;
      top: .895rem;
      left: .18rem;
      right: .18rem;
      height: 1.26rem;
      width: 3.39rem;
      background: #FFF;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
      border-radius: 8px 8px 0 0;
      border-bottom: 1px solid #F1F1F1;

      &__grade {
        display: flex;
        position: relative;
        top: .59rem;

        &__tatol {
          line-height: .36rem;
          width: 1.7rem;
          margin-left: .85rem;
          font-size: 24px;
          color: #262628;
          letter-spacing: 0.19px;
          text-align: center;
        }

        &__text {
          display: flex;
          margin: .11rem .37rem .9rem .12rem;
          width: .35rem;
          height: .15rem;
          line-height: .15rem;
          background-image: linear-gradient(180deg, #BEE700 0%, #8ACA00 100%);
          border-radius: 100px;
          font-size: 10px;
          letter-spacing: -0.36px;

          .icon {
            transform: scale(.7);
            color: #FFC700;
            background: rgba(0, 0, 0, 0.20);
            border-radius: 50%;
          }

          .text {
            transform: scale(.7);
            color: #FFFFFF;
          }
        }
      }

      &__id {
        position: absolute;
        width: 100%;
        bottom: .12rem;
        font-size: 14px;
        color: #C1C0C9;
        text-align: center;
      }

    }

    &__welfares {
      position: absolute;
      display: flex;
      top: 2.15rem;
      left: .18rem;
      right: .18rem;
      height: .76rem;
      width: 2.71rem;
      padding: .12rem .34rem .16rem .34rem;
      background: #fff;
      box-shadow: 0 .08rem .16rem 0 rgba(0, 0, 0, 0.08);
      border-radius: 0 0 .08rem .08rem;
      border-top: .01rem solid #F1F1F1;

      &__item {
        flex: 1;

        &__text {
          font-size: 12px;
          color: #C1C0C9;
          text-align: center;
        }

        &__quantity {
          font-size: 20px;
          color: #262628;
          text-align: center;
        }
      }
    }
  }

  .manage {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 3.35rem;
    left: .18rem;
    right: .18rem;
    width: 3.07rem;
    padding: 0 .16rem 0 .16rem;
    background: #FFFFFF;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.08);
    border-radius: 8px;

    &__option {
      display: flex;
      height: .49rem;
      line-height: .49rem;

      &__iconfont {
        width: .22rem;
        height: .22rem;
        line-height: .22rem;
        border-radius: 8px;
        margin: .14rem .12rem .15rem 0;
        color: #FFFFFF;
        text-align: center;

      }

      &__text {
        flex: 4;
        font-size: 14px;
        color: #262626;
      }

      &__icon {
        flex: 2;
        color: #C2C4CA;
        transform: rotate(180deg);
      }

      .bgColor1 {
        background: #ED4A47;
      }

      .bgColor2 {
        background: #32C5FF;
      }

      .bgColor3 {
        background: rgba(144, 19, 254, 0.92);
      }
    }
  }
}</style>
