<script>
import { state } from "../state.js"
export default {
    name: "AppHeader",
    data() {
        return {
            state: state
        }
    },
    methods: {
        searchTitle() {
            state.getMovies()
            state.userSearch = ""
        }
    }
}
</script>

<template>
    <div id="site_header">
        <span>header</span>
        <input type="text" v-model="state.userSearch">
        <button @click="searchTitle()">cerca</button>
    </div>
</template>



<style scoped></style>