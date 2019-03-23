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
      el-button 登録
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
    console.log(this.$store.state.user.name)
    this.name = this.$store.state.user.name
    this.email = this.$store.state.user.email
    this.password = this.$store.state.user.password
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
