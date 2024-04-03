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
                :language="movie.original_language" :vote="movie.vote_average" :imageUrl="movie.poster_path" />
        </ul>
        <ul class="tv-series-list">
            <ResultCard v-for="serie in state.tvSeries" :title="serie.name" :original_title="serie.original_name"
                :language="serie.original_language" :vote="serie.vote_average" :imageUrl="serie.poster_path" />
        </ul>
    </div>

</template>



<style scoped></style>