<template lang="pug">
  section.Signin
    .signin
      .title ログイン
      .email.label メールアドレス
      el-input.email(placeholder="tobb422@gmail.com")
      .password.label パスワード
      el-input.password(placeholder="********")
      el-button(@click="click") ログイン
      nuxt-link(to="/sign-up") 新規登録はこちら
</template>

<script>
import Session from '~/plugins/session'

export default {
  name: 'SignIn',
  methods: {
    click() {
      const session = new Session()
      session.set({ token: 'test' })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.Signin {
  .signin {
    width: 300px;
    margin: 5rem auto;

    display: flex;
    flex-direction: column;

    & > .title {
      margin-bottom: 3rem;
      @include type-heading;
      align-self: center;
    }

    & > .label {
    }

    & > .el-input {
      margin: 0.5rem 0 2rem;
    }

    & > .el-button {
      align-self: center;
      width: 150px;
      background-color: $color-sky;
      color: $color-white;
    }

    & > a {
      margin: 2rem 0;
      text-align: center;
      text-decoration: underline;
    }
  }
}
</style>
