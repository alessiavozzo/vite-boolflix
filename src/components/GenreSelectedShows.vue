<script>
import { state } from "../state.js"
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import ResultCard from "./ResultCard.vue";

export default {
    name: "GenreSelectedShows",
    data() {
        return {
            state: state
        }
    },
    components: {
        ResultCard,
        Carousel,
        Slide,
        Pagination,
        Navigation
    },
    props: {
        chosenGenre: String
    }

}
</script>


<template>
    <!-- movies filtered by genre -->
    <div class="genre-movies" v-if="state.moviesList.length !== 0">
        <h2>Film {{ chosenGenre }}:</h2>
        <Carousel :itemsToShow="6.5" :wrapAround="true" :transition="500" :itemsToScroll="5" snapAlign="start">
            <Slide v-for="(genreMovie, index) in state.moviesList" :key="index">
                <ResultCard :title="genreMovie.title" :original_title="genreMovie.original_title"
                    :language="genreMovie.original_language" :vote="genreMovie.vote_average"
                    :imageUrl="genreMovie.poster_path" :overview="genreMovie.overview" :id="genreMovie.id"
                    :type="genreMovie.media_type" />
            </Slide>
            <template #addons>
                <Navigation />
            </template>
        </Carousel>

    </div>

    <!-- series filtered by genre -->
    <div class="genre-series" v-if="state.seriesList.length !== 0">
        <h2>Serie TV {{ chosenGenre }}:</h2>
        <Carousel :itemsToShow="6.5" :wrapAround="true" :transition="500" :itemsToScroll="5" snapAlign="start">
            <Slide v-for="(genreSerie, index) in state.seriesList" :key="index">
                <ResultCard :title="genreSerie.name" :original_title="genreSerie.original_name"
                    :language="genreSerie.original_language" :vote="genreSerie.vote_average"
                    :imageUrl="genreSerie.poster_path" :overview="genreSerie.overview" :id="genreSerie.id"
                    :type="genreSerie.media_type" />
            </Slide>
            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>
</template>


<style scoped>
h2 {
    padding-bottom: 0.5rem;
}

li {
    list-style: none;
    padding: 0 0.2rem;
}
</style>