<template lang="pug">
section.Signin
  .title ログイン
  .email.label メールアドレス
  el-input.email(placeholder="✕✕✕✕@✕✕✕✕.com" v-model="email")
  .password.label パスワード
  el-input.password(placeholder="********" v-model="password")
  el-button(@click="click") ログイン
  nuxt-link(to="/sign-up") 新規登録はこちら
  GoogleAuthButton.google
</template>

<script>
import Session from '~/plugins/session'
import GoogleAuthButton from '~/components/molecules/GoogleAuthButton'

export default {
  name: 'SignIn',
  components: { GoogleAuthButton },
  data() {
    return {
      email: null,
      password: null
    }
  },
  mounted() {
    const session = new Session()
    if (session.get('token')) {
      this.$router.push('/')
      this.$store.dispatch('toast/error', {
        message: 'ログイン中です'
      })
    }
  },
  methods: {
    isInValidForm() {
      return !this.email || !this.password
    },
    click() {
      this.$store
        .dispatch('auth/login', {
          email: this.email,
          password: this.password
        })
        .then(_ => {
          this.$router.push('/')
          this.$store.dispatch('toast/success', {
            message: 'ログインしました'
          })
        })
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.Signin {
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

  & > .google {
    align-self: center;
    width: 100%;
  }
}
</style>
