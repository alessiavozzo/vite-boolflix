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
        <div class="list-container">

            <ul class="result-list list-inline row" v-if="state.movies.length > 0 || state.tvSeries.length > 0">
                <ResultCard v-for="movie in state.movies" :title="movie.title" :original_title="movie.original_title"
                    :language="movie.original_language" :vote="movie.vote_average" :imageUrl="movie.poster_path"
                    :overview="movie.overview" />

                <ResultCard v-for="serie in state.tvSeries" :title="serie.name" :original_title="serie.original_name"
                    :language="serie.original_language" :vote="serie.vote_average" :imageUrl="serie.poster_path"
                    :overview="serie.overview" />
            </ul>
        </div>

    </div>

</template>



<style scoped>
#site_main {
    background-color: var(--bool-dark);

    .list-container {
        padding: 5rem 1rem;
        max-width: 1600px;
        margin: 0 auto;

        ul {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.2rem;
        }
    }

}
</style>