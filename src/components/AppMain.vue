<script>
import { state } from "../state.js"
import ResultCard from "./ResultCard.vue";
import CategoryFilter from "./CategoryFilter.vue"
import MediatypeFilter from "./MediatypeFilter.vue";
import DefaultPage from "./DefaultPage.vue";
import axios from "axios";
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
    name: "AppMain",
    components: {
        ResultCard,
        CategoryFilter,
        MediatypeFilter,
        DefaultPage,
        Carousel,
        Slide,
        Pagination,
        Navigation
    },
    data() {
        return {
            state: state,
            filteredShowsByCategory: []
        }
    },
    methods: {
        getMoviesList(id) {
            console.log(id);
            axios
                .get(`https://api.themoviedb.org/3/discover/movie?&api_key=${state.API_KEY}&with_genres=${id}`)
                .then(response => {
                    console.log(response.data.results);
                    state.moviesList = response.data.results
                })
        },

        getSeriesList(id) {
            console.log(id);
            axios
                .get(`https://api.themoviedb.org/3/discover/tv?&api_key=${state.API_KEY}&with_genres=${id}`)
                .then(response => {
                    console.log(response.data.results);
                    state.seriesList = response.data.results
                })
        },

        getShowsByGenre(id) {
            this.getMoviesList(id);
            this.getSeriesList(id);
            state.genres = []
        },

        callPopularMovies() {
            axios
                .get(`https://api.themoviedb.org/3/movie/popular?&api_key=${state.API_KEY}`)
                .then(response => {
                    //console.log(response.data.results);
                    state.popularMovies = response.data.results
                })
        },
        callPopularSeries() {
            axios
                .get(`https://api.themoviedb.org/3/tv/popular?&api_key=${state.API_KEY}`)
                .then(response => {
                    console.log(response.data.results);
                    state.popularSeries = response.data.results
                })
        },
        filterShows() {
            //this.filteredShowsByCategory memorizza i risultati filtrati per categoria
            //ogni volta che parte la funzione, deve svuotarsi
            //la funzione parte al change opzione del select
            this.filteredShowsByCategory = []

            //se l'utente non sceglie nessun filtro, dammi tutti i risultati e assegnali a filteredShowsByCategories
            //console.log(this.state.results);            
            //console.log(this.selectGenre)
            if (state.selectGenre === "" || state.selectGenre === "all") {
                this.filteredShowsByCategory = this.state.results
            }
            //se l'utente sceglie un filtro (@change sul select), filtra l'array e lo memorizza in filteredShowByCategories. 
            //Per ogni show, se c'è genre_ids, prendo tutti i risultati e controllo se includono il genre_id selezionato dall'utente
            else {
                this.filteredShowsByCategory = this.state.results.filter(show => {
                    //console.log(show.genre_ids);
                    //console.log(show.genre_ids.includes(this.selectGenre));
                    return show.genre_ids && show.genre_ids.includes(state.selectGenre)
                })
            }
        },

        //accetta in entrata mediatype che gli passo al click sul bottone
        filterByMediaType(mediaType) {
            //console.log(state.results);
            state.selectedType = mediaType
            //console.log(this.selectedType);
        },

        resetFilters() {
            state.selectedType = "";
        }
    },

    //mi serve computed perchè vede i cambiamenti
    //se selectGenre è vuoto, deve mostrare tutti i risultati, altrimenti deve mostrare gli show filtrati per la categoria che ho scelto = displayedResults
    //ciclo in modo condizionale in displayedResults per ResultCard
    computed: {
        displayedResults() {
            let filteredShows = state.selectGenre === "" || state.selectGenre === "all" ? this.state.results : this.filteredShowsByCategory
            //se mediatype è "tv", filtra gli show che hanno mediatype tv
            if (state.selectedType === "tv") {
                return filteredShows.filter(show => {
                    //console.log(show.media_type);
                    return show.media_type === "tv"
                })
            }
            //se mediatype è "movie", filtra gli show che hanno mediatype film
            else if (state.selectedType === "movie") {
                return filteredShows.filter(show => show.media_type === "movie")
            }
            //se non seleziono nessun mediatype, voglio tutti i risultati
            else {
                return filteredShows
            }
            //return state.selectGenre === "" ? this.state.results : this.filteredShowsByCategory;
        },

        //i risultati devono apparire o se totalResults > 0 o se ci sono risultati già visualizzati in pagina
        //showResults è vera se si verifica uno dei due casi
        showResults() {
            return this.state.totalResults > 0 || this.displayedResults.length > 0;
        }
    },

    created() {
        this.callPopularMovies(),
            this.callPopularSeries(),
            state.getAllGenres()
    }
}
</script>

<template>
    <div id="site_main">
        <div class="main-container">

            <!-- filter movie and series by genre -->
            <div class="pick-a-genre">
                <div class="genres-list">
                    <span class="single-genre" v-for="genre in state.genresList" @click="getShowsByGenre(genre.id)">{{
                        genre.name }}</span>
                </div>
            </div>

            <!-- filters -->
            <div class="filters d-flex">
                <MediatypeFilter @filter-tv="filterByMediaType('tv')" @filter-movie="filterByMediaType('movie')"
                    @reset-btn="resetFilters()" />
                <CategoryFilter @use-filter="filterShows()" />
            </div>

            <!-- default page -->
            <div class="default-page" v-if="!showResults && state.totalResults !== 0 && state.moviesList.length === 0">
                <DefaultPage />
            </div>

            <!-- results list -->
            <!-- if there are results -->
            <ul class="result-list list-inline row" v-else-if="showResults && state.moviesList.length === 0">

                <ResultCard v-for="show in displayedResults"
                    :title="show.media_type === 'movie' ? show.title : show.name"
                    :original_title="show.media_type === 'movie' ? show.original_title : show.original_name"
                    :language="show.original_language" :vote="show.vote_average" :imageUrl="show.poster_path"
                    :overview="show.overview" :id="show.id" :type="show.media_type" />

            </ul>
            <!-- if nothing is found -->
            <div class="no-results d-flex" v-else-if="state.totalResults === 0 && state.moviesList.length === 0">
                <p>Nessun risultato trovato per la tua ricerca. Suggerimenti:</p>
                <ul>
                    <li>Prova con parole chiave diverse</li>
                    <li>Cerchi un film o una serie tv?</li>
                    <li>Prova a cercare il titolo di un film o di una serie tv</li>
                </ul>

            </div>

            <div class="shows-genre-selected" v-else-if="state.moviesList.length !== 0">

                <h2>FILM</h2>
                <ul class="movies list-inline row">

                    <Carousel :itemsToShow="5" :wrapAround="true" :transition="500" :itemsToScroll="4">
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

                    <!-- <ResultCard v-for="genreMovie in state.moviesList" :title="genreMovie.title"
                        :original_title="genreMovie.original_title" :language="genreMovie.original_language"
                        :vote="genreMovie.vote_average" :imageUrl="genreMovie.poster_path"
                        :overview="genreMovie.overview" :id="genreMovie.id" :type="genreMovie.media_type" /> -->
                </ul>

                <h2>SERIE</h2>
                <!-- <ul class="series list-inline row">

                    <ResultCard v-for="genreSerie in state.seriesList" :title="genreSerie.name"
                        :original_title="genreSerie.original_name" :language="genreSerie.original_language"
                        :vote="genreSerie.vote_average" :imageUrl="genreSerie.poster_path"
                        :overview="genreSerie.overview" :id="genreSerie.id" :type="genreSerie.media_type" />

                </ul> -->

                <Carousel :itemsToShow="5" :wrapAround="true" :transition="500" :itemsToScroll="4">
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

        </div>
    </div>

</template>



<style scoped>
#site_main {
    background-color: var(--bool-dark);

    .main-container {
        padding: 5rem 1rem;
        max-width: 1600px;
        margin: 0 auto;
        color: var(--bool-lighter);

        .filters {
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }

        ul {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.2rem;
        }
    }

    .no-results {
        padding-top: 4rem;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
    }

    .default-page {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
}
</style>