<template lang="pug">
  .Pomorint
    header.header
      ul.menu
        li #[nuxt-link(to="/") #[img.logo(src="~/assets/images/logo.png")]]
        li #[nuxt-link(to="/pomodoro") ポモドーロ]
        li #[nuxt-link(to="/kanban") カンバン]
      el-popover.popover(
        placement="bottom"
        width="300"
        trigger="hover"
      )
        ul.popover-inner(style="margin: 0.5rem 0.5rem 0")
          li(style="margin-bottom: 0.5rem") #[nuxt-link(to="/mypage") プロフィール]
          el-button(type="text" @click="test") ログアウト
        el-button(slot="reference").account
    nuxt
</template>

<script>
export default {
  methods: {
    test() {
      console.log('aaa')
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
    background-color: $color-white;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
  }
}
</style>
