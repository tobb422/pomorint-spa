<template lang="pug">
  section.Signup
    .title 新規登録
    .name.label ニックネーム
    el-input.name(placeholder="tobb422" v-model="name")
    .email.label メールアドレス
    el-input.email(placeholder="✕✕✕✕@✕✕✕✕.com" v-model="email")
    .password.label パスワード
    el-input.password(placeholder="********" v-model="password" show-password)
    el-button.signup(@click="click") 登録
    nuxt-link(to="/sign-in") ログインはこちら
    GoogleAuthButton.google
</template>

<script>
import Session from '~/plugins/session'
import GoogleAuthButton from '~/components/molecules/GoogleAuthButton'

export default {
  name: 'SignUp',
  components: { GoogleAuthButton },
  data() {
    return {
      name: null,
      email: null,
      password: null
    }
  },
  mounted() {
    if (Session.get('token')) {
      this.$router.push('/')
      this.$store.dispatch('toast/error', {
        message: 'ログイン中です'
      })
    }
  },
  methods: {
    isInvalidForm() {
      return !this.name || !this.email || !this.password
    },
    click() {
      if (this.isInvalidForm()) {
        this.$store.dispatch('toast/error', {
          message: 'すべてのフォームに入力してください'
        })
        return
      }

      this.$store
        .dispatch('auth/signup', {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(_ => {
          this.$router.push('/')
          this.$store.dispatch('toast/success', {
            message: '新規登録しました'
          })
        })
        .catch(_ => {
          this.$store.dispatch('toast/error', {
            message: '新規登録に失敗しました'
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

.Signup {
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
    background-color: $color-sky;
    color: $color-white;
  }

  & > .el-button.signup {
    align-self: center;
    width: 150px;
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
