<!-- 登录 -->
<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
    <div class="wrapper__input">
      <input class="wrapper__input__content" placeholder="请输入用户名" v-model="username" />
    </div>
    <div class="wrapper__input">
      <input class="wrapper__input__content" placeholder="请输入密码" type="password" v-model="password"
        autocomplete="new-password" />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link" @click="handleRegisterClick">立即注册</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
// 引入实例
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'

const useLoginEffect = (showToast) => {
  const router = useRouter()
  // 绑定输入框的值
  const data = reactive({ username: '', password: '' })
  const handleLogin = async () => {
    try {
      const { username, password } = data
      if (username === '' || password === '') {
        showToast('账号或密码不能为空')
        localStorage.isLogin = false
        return
      }
      const result = await post('/api/user/login', {
        username: data.username,
        password: data.password
      })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        // 告诉路由登录后从新跳转
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}

export default {
  name: 'Login',
  components: { Toast },
  setup () {
    // 获取到路由的节点
    const router = useRouter()
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)

    const handleRegisterClick = () => {
      router.push({ name: 'Register' })
    }
    return {
      username,
      password,
      toastMessage,
      show,
      handleLogin,
      handleRegisterClick
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../style/viriables.scss";

.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);

  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
  }

  &__input {
    box-sizing: border-box;
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    background: #f9f9f9 100%;
    border: .01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 6rem;

    &__content {
      // 光标过大解决办法
      // margin-top: .12rem;
      // line-height: .22rem;
      line-height: .48rem;
      border: 0;
      outline: none;
      width: 100%;
      background: none;
      font-size: .16rem;
      color: #000000;

      &::placeholder {
        color: $content-notice-fontcolor;
      }
    }
  }

  &__login-button {
    margin: .32rem .4rem .16rem .4rem;
    line-height: .48rem;
    font-size: .16rem;
    text-align: center;
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 4rem;
    color: $bgColor
  }

  &__login-link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontcolor;
    letter-spacing: 0;
  }
}
</style>
