<template lang="pug">
  transition(name="fade")
    section(
    :class="{ Toast: true, success: isSuccess, error: isError }"
    v-show="isShown"
    ) {{ message }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Toast',
  computed: mapState({
    isShown: state => state.toast.isShown,
    isSuccess: state => state.toast.isSuccess,
    isError: state => state.toast.isError,
    message: state => {
      const message = state.toast.message
      if (message === null) {
        return
      }
      if (typeof message !== 'string') {
        return '不明なエラーが発生しました'
      }
      return message
    }
  }),
  watch: {
    isShown(value) {
      if (!value) {
        return
      }
      setTimeout(() => {
        this.hide()
      }, 2000)
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
  color: $color-white;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 6rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 1.5rem 2.5rem;
  min-height: 40px;
  width: 450px;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

  &.success {
    background-color: $color-alert-success;
  }
  &.error {
    background-color: $color-alert-error;
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
