<script>
import { state } from "../state.js"
export default {
    name: "AppMain",
    data() {
        return {
            state: state
        }
    },
}
</script>

<template>
    <div id="site_main">
        <span>MAIN</span>
        <ul>
            <li v-for="movie in state.movies">
                <div class="title">Titolo: {{ movie.title }}</div>
                <div class="original-title">Titolo originale: {{ movie.original_title }}</div>
                <div class="lang">Lingua: {{ movie.original_language }}</div>
                <div class="vote">Voto: {{ movie.vote_average }}</div>
            </li>
        </ul>
    </div>
</template>



<style scoped></style>