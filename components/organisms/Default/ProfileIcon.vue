<template lang="pug">
.ProfileIcon
  .for-pc(v-if="forPC")
    el-popover(placement="bottom" width="300" trigger="click")
      ul.popover-inner(style="margin: 0.5rem 0.5rem 0")
        li(style="margin-bottom: 0.5rem") #[nuxt-link(to="/mypage") プロフィール]
        el-button(type="text" @click="logout") ログアウト
      .account(slot="reference")
        img(v-if="profileImage" :src="profileImage")
        i.fas.fa-user-circle(v-else)
  .for-sp(v-else)
    el-popover(placement="bottom" width="300" trigger="click")
      ul.popover-inner(style="margin: 0.5rem 0.5rem 0")
        li(style="margin-bottom: 0.5rem") #[nuxt-link(to="/mypage") プロフィール]
        li(style="margin-bottom: 0.5rem") #[nuxt-link(to="/pomodoro") ポモドーロ]
        li(style="margin-bottom: 0.5rem") #[nuxt-link(to="/kanban") カンバン]
        el-button(type="text" @click="logout") ログアウト
      .account(slot="reference")
        img(v-if="profileImage" :src="profileImage")
        i.fas.fa-user-circle(v-else)
</template>

<script>
import { mapState } from 'vuex'

const Boundary = 800

export default {
  data() {
    return {
      forPC: true
    }
  },
  computed: mapState({
    profileImage: state => state.user.image
  }),
  mounted() {
    const setForPC = _ => (this.forPC = window.innerWidth >= Boundary)

    setForPC()
    window.addEventListener('resize', setForPC)
  },
  methods: {
    async logout() {
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

<style lang="scss" scoped>
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';

.ProfileIcon {
  .account {
    font-size: $icon-size;
    color: $color-white;
    justify-self: end;

    & > img {
      height: $icon-size;
      width: $icon-size;
      border-radius: 50%;
    }
  }
}
</style>
