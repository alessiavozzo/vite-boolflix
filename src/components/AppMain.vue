<script>
import { state } from "../state.js"
import ResultCard from "./ResultCard.vue";
export default {
    name: "AppMain",
    components: {
        ResultCard
    },
    data() {
        return {
            state: state
        }
    },
}
</script>

<template>
    <div id="site_main">
        <ul class="movies-list">
            <ResultCard v-for="movie in state.movies" :title="movie.title" :original_title="movie.original_title"
                :language="movie.original_language" :vote="movie.vote_average" />


            <!-- <li v-for="movie in state.movies">
                <div class="title">Titolo: {{ movie.title }}</div>
                <div class="original-title">Titolo originale: {{ movie.original_title }}</div>
                <div class="lang">Lingua: {{ movie.original_language }}</div>
                <div class="vote">Voto: {{ movie.vote_average }}</div>
            </li> -->
        </ul>
    </div>
</template>



<style scoped></style>