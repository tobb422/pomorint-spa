<template lang="pug">
  .Pomorint
    header.header
      HeaderMenu.menu
      ProfileIcon.popover
    nuxt
    Toast
</template>

<script>
import HeaderMenu from '~/components/organisms/Default/HeaderMenu'
import ProfileIcon from '~/components/organisms/Default/ProfileIcon'
import Toast from '~/components/molecules/Toast'

export default {
  components: {
    HeaderMenu,
    ProfileIcon,
    Toast
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
    @include forSP() {
      grid-template-columns: 1fr 1fr;
    }
  }

  .menu {
    margin-left: 2rem;
    @include forSP() {
      margin-left: 1rem;
    }
  }

  .popover {
    justify-self: end;
    margin-right: 2rem;
    @include forSP() {
      margin-right: 1rem;
    }
  }
}
</style>
