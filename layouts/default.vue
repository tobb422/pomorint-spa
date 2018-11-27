<template lang="pug">
  .Pomorint
    header.header
      ul.menu
        li #[img.logo(src="~/assets/images/logo.png")]
        li ダッシュボード
        li スプリント
      .account B
    nuxt
</template>

<style lang="scss">
@import '~assets/styles/main';

.Pomorint {
  display: grid;
  grid-template-areas: 'header' 'main';
  grid-template-rows: 4rem 1fr;

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
  }

  .logo {
    height: 3rem;
  }

  .account {
    justify-self: end;
    margin-right: 2rem;

    background-color: $color-white;
    color: $color-text;

    height: 2rem;
    width: 2rem;
    border-radius: 50%;

    text-align: center;
    @include type-heading;
    line-height: 1.3;
  }
}
</style>
