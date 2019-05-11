<template lang="pug">
.HeaderMenu
  ul
    li #[nuxt-link(to="/") #[img.logo(src="~/assets/images/logo.png")]]
    li.for-pc #[nuxt-link(to="/pomodoro") ポモドーロ]
    li.for-pc #[nuxt-link(to="/kanban") カンバン]
</template>

<style lang="scss" scoped>
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';

.HeaderMenu {
  ul {
    display: flex;
    align-items: center;

    & > li {
      display: inline-block;
      margin-right: 2rem;

      &.for-pc {
        @include forSP() {
          display: none;
        }
      }
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
