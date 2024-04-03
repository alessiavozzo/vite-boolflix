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
            state.getMovies();
            state.getTvSeries();
            state.userSearch = "";
        }
    }
}
</script>

<template>
    <div id="site_header">
        <input type="text" placeholder="Cerca un titolo..." v-model="state.userSearch" @keyup.enter="searchTitle()">
        <button @click="searchTitle()">cerca</button>
    </div>
</template>



<style scoped></style>