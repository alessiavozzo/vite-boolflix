<script>
import AppHeader from "./components/AppHeader.vue"
import AppMain from "./components/AppMain.vue"

export default {
  name: "App",
  components: {
    AppHeader,
    AppMain
  },
  methods: {
    reloadPage() {
      window.location.reload()
    }
  }
}
</script>

<template>
  <AppHeader @reload-page="reloadPage()" />
  <AppMain />
</template>

<style scoped></style>
