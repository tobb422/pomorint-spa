<template lang="pug">
  transition(name="fade")
    .ModalWindow(v-show="isShown")
      .overlay(@click="hide")
      .modal-wrapper
        section.modal
          main
            slot(name="main")
</template>

<script>
export default {
  name: 'ModalWindow',
  props: {
    isShown: {
      type: Boolean,
      required: true
    },
    hide: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/styles/_vars';
@import '~assets/styles/_libs';
@import '~assets/styles/_type';

.ModalWindow {
  .overlay {
    z-index: 50;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $color-black;
    opacity: 0.4;
  }

  .modal-wrapper {
    pointer-events: none;
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal {
    pointer-events: auto;
    position: fixed;
    background-color: $color-white;
    top: auto;
    bottom: auto;
    left: auto;
    right: auto;
    width: 600px;
  }

  main {
    @include type-normal;
    height: 100%;
    padding: 1.5rem 1rem;
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
