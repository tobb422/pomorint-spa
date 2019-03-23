<template lang="pug">
  section.Signup
    .signup
      .title 新規登録
      .name.label ニックネーム
      el-input.name(placeholder="tobb422" v-model="name")
      .email.label メールアドレス
      el-input.email(placeholder="✕✕✕✕@✕✕✕✕.com" v-model="email")
      .password.label パスワード
      el-input.password(placeholder="********" v-model="password")
      el-button(@click="click") 登録
      nuxt-link(to="/sign-in") ログインはこちら
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      name: null,
      email: null,
      password: null
    }
  },
  methods: {
    isInvalidForm() {
      return !this.name || !this.email || !this.password
    },
    click() {
      if (this.isInvalidForm()) {
        return
      }

      this.$store.dispatch('user/signup', {
        name: this.name,
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.Signup {
  .signup {
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
