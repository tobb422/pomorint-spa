<template lang="pug">
section.AuthCallback
  | 少々お待ち下さい
</template>

<script>
export default {
  name: 'AuthCallback',
  mounted() {
    console.log('aaaa')
    console.log(this.$route)
    this.$store
      .dispatch('auth/google', { token: this.$route.query.token })
      .then(_ => {
        this.$store.dispatch('user/setUser').then(_ => {
          this.$router.replace('/')
          this.$store.dispatch('toast/success', {
            message: 'Googleアカウントと連携しました'
          })
        })
      })
  }
}
</script>
