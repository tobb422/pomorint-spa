<template lang="pug">
.ProfileIcon
  el-popover(placement="bottom" width="300" trigger="click")
    ul.popover-inner(style="margin: 0.5rem 0.5rem 0")
      li(style="margin-bottom: 0.5rem") #[nuxt-link(to="/mypage") プロフィール]
      el-button(type="text" @click="signout") ログアウト
    .account(slot="reference")
      img(v-if="accountImage" :src="accountImage")
      i.fas.fa-user-circle(v-else)
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: mapState({
    accountImage: state => state.user.image
  }),
  methods: {
    async signout() {
      const logout = await this.$store
        .dispatch('auth/logout')
        .then(_ => true)
        .catch(_ => false)
      if (logout) {
        this.$router.push({ name: 'sign-in' })
        this.$store.dispatch('toast/success', {
          message: 'ログアウトしました'
        })
      } else {
        this.$store.dispatch('toast/error', {
          message: 'ログアウトに失敗しました'
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/_vars';

.ProfileIcon {
  .account {
    font-size: 2.5rem;
    color: $color-white;
    justify-self: end;

    & > img {
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
    }
  }
}
</style>
