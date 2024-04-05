<script>
import { state } from "../state.js"
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
    name: "DefaultPage",
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
    data() {
        return {
            state: state
        }
    }
}
</script>


<template>
    <div class="popular-movies">
        <h2>Film più visti:</h2>
        <Carousel :itemsToShow="5" :wrapAround="true" :transition="500" :itemsToScroll="4">
            <Slide v-for="(popularMovie, index) in state.popularMovies" :key="index">
                <img class="carousel__item" :src="state.urlTitleImage + popularMovie.poster_path"
                    :alt="popularMovie.title">
            </Slide>
            <template #addons>
                <Navigation />
            </template>
        </Carousel>

    </div>

    <div class="popular-series">
        <h2>Serie tv più viste:</h2>
        <Carousel :itemsToShow="5" :wrapAround="true" :transition="500" :itemsToScroll="4">
            <Slide v-for="(popularSerie, index) in state.popularSeries" :key="index">
                <img class="carousel__item" :src="state.urlTitleImage + popularSerie.poster_path"
                    :alt="popularSerie.title">
            </Slide>
            <template #addons>
                <Navigation />
            </template>
        </Carousel>

    </div>
</template>


<style scoped>
h2 {
    padding: 1rem 0;
}

li {
    height: 200px;
    padding: 0 0.2rem;

    &:hover {
        border: 1px solid var(--bool-lighter);
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>