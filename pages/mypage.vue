<template lang="pug">
  section.Mypage
    .profile
      .title プロフィール
      .name.label ニックネーム
      el-input.name(placeholder="tobb422" v-model="name")
      .email.label メールアドレス
      el-input.email(placeholder="tobb422@gmail.com" v-model="email")
      .password.label パスワード
      el-input.password(placeholder="********" v-model="password" show-password)
      el-button(@click="click") 登録
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Mypage',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  mounted() {
    this.name = this.$store.state.user.name
    this.email = this.$store.state.user.email
    this.password = this.$store.state.user.password
  },
  methods: {
    click() {
      let params = {}
      if (!!this.name) {
        params['name'] = this.name
      }
      if (!!this.email) {
        params['email'] = this.email
      }
      if (!!this.password) {
        params['password'] = this.password
      }

      this.$store
        .dispatch('user/update', params)
        .then(_ => {
          this.$store.dispatch('toast/success', {
            message: 'プロフィールを更新しました'
          })
        })
        .catch(_ => {
          this.$store.dispatch('toast/error', {
            message: 'プロフィール更新に失敗しました'
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

.Mypage {
  .profile {
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
  }
}
</style>
