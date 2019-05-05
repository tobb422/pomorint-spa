<template lang="pug">
.HeaderMenu
  ul.menu
    li #[nuxt-link(to="/") #[img.logo(src="~/assets/images/logo.png")]]
    li #[nuxt-link(to="/pomodoro") ポモドーロ]
    li #[nuxt-link(to="/kanban") カンバン]
</template>

<style lang="scss">
@import '~assets/styles/_vars';

.HeaderMenu {
  ul.menu {
    display: flex;
    align-items: center;

    & > li {
      display: inline-block;
      margin-right: 2rem;
    }

    & > li > a {
      color: $color-white;
    }

    .logo {
      height: 3rem;
    }
  }
}
</style>
