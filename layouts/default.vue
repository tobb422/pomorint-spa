<template lang="pug">
  .Pomorint
    header.header
      ul.menu
        li #[nuxt-link(to="/") #[img.logo(src="~/assets/images/logo.png")]]
        li #[nuxt-link(to="/pomodoro") ポモドーロ]
        li #[nuxt-link(to="/kanban") カンバン]
        <!--li #[nuxt-link(to="/sprint") スプリント]-->
        <!--li #[nuxt-link(to="/stats") スタッツ]-->
      el-popover.popover(
        placement="bottom"
        width="300"
        trigger="click"
      )
        ul.popover-inner(style="margin: 0.5rem 0.5rem 0")
          li(style="margin-bottom: 0.5rem") #[nuxt-link(to="/mypage") プロフィール]
          el-button(type="text" @click="signout") ログアウト
        .account(slot="reference")
          img(v-if="accountImage" :src="accountImage")
          i.fas.fa-user-circle(v-else)
    nuxt
    Toast
</template>

<script>
import Toast from '~/components/molecules/Toast'
import { mapState } from 'vuex'

export default {
  components: {
    Toast
  },
  computed: mapState({
    accountImage: state => state.user.image
  }),
  methods: {
    test() {
      console.log('test')
    },
    signout() {
      this.$store.dispatch('auth/logout').then(_ => {
        this.$router.push({ name: 'sign-in' })
        this.$store.dispatch('toast/success', {
          message: 'ログアウトしました'
        })
      })
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/main';

.Pomorint {
  display: grid;
  grid-template-areas: 'header' 'main';
  grid-template-rows: 4rem 1fr;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  header.header {
    grid-area: header;
    background-color: $color-theme;
    color: $color-white;
    font-weight: bold;

    display: grid;
    grid-template-areas: 'menu account';
    grid-template-columns: 1fr 2rem;
    align-items: center;
  }

  ul.menu {
    display: flex;
    align-items: center;
    margin-left: 2rem;

    & > li {
      display: inline-block;
      margin-right: 2rem;
    }

    & > li > a {
      color: $color-white;
    }
  }

  .logo {
    height: 3rem;
  }

  .popover {
    justify-self: end;
    margin-right: 2rem;
  }

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
