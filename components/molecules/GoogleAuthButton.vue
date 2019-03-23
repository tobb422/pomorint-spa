<template lang="pug">
.GoogleAuthButton
  el-button(@click="click")
    i(class="fab fa-google") 　Google アカウントで利用する
</template>

<script>
export default {
  name: 'GoogleAuthButton',
  methods: {
    click() {
      window.location.replace('http://localhost:3001/auth/google')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.GoogleAuthButton {
  & > .el-button {
    background-color: $color-sky;
    color: $color-white;
    padding: 1rem;
    width: 100%;
  }
}
</style>
