<template lang="pug">
transition(name="fade")
  .Toast(
    :class="{ success: isSuccess, error: isError }"
    v-show="isShown"
  ) {{ message }}
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Toast',
  computed: {
    ...mapState({
      isShown: state => state.toast.isShown,
      isSuccess: state => state.toast.isSuccess,
      isError: state => state.toast.isError
    }),
    ...mapGetters({
      message: 'toast/showMessage'
    })
  },
  watch: {
    isShown() {
      setTimeout(this.hide, 2000)
    }
  },
  methods: {
    hide() {
      this.$store.dispatch(`toast/hide`)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.Toast {
  @include type-title;
  color: $color-black;
  background-color: $color-white;
  z-index: 1000;
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  padding: 1.5rem 2.5rem;
  min-height: 40px;
  width: 450px;
  box-shadow: 1px 0 1px 1px rgba(0, 0, 0, 0.2);

  &.success {
    border-left: 4px solid $color-alert-success;
  }
  &.error {
    border-left: 4px solid $color-alert-error;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 3s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
