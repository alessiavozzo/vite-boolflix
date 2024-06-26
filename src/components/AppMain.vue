<script>
import { state } from "../state.js"
import ResultCard from "./ResultCard.vue";
import CategoryFilter from "./CategoryFilter.vue"
import MediatypeFilter from "./MediatypeFilter.vue";
import DefaultPage from "./DefaultPage.vue";
import GenreSelectedShows from "./GenreSelectedShows.vue";
import axios from "axios";
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';



export default {
    name: "AppMain",
    components: {
        ResultCard,
        CategoryFilter,
        MediatypeFilter,
        DefaultPage,
        GenreSelectedShows,
        Carousel,
        Slide,
        Pagination,
        Navigation
    },
    data() {
        return {
            state: state,
            filteredShowsByCategory: [],
            chosenGenre: "",
            show: false,
            /* allMovies: [] */
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

        getShowsByGenre(id, name) {
            this.getMoviesList(id);
            this.getSeriesList(id);
            this.chosenGenre = name;
            state.genres = [];
            state.allMovies = [];
            state.allSeries = []
            //console.log(this.chosenGenre);
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


            <!-- FILTERS: generic filter + searched show filters -->

            <!-- filter movies and series by genre -->
            <div class="pick-a-genre d-flex" v-if="!showResults">
                <button type="button" class="show-genres" @click="show = !show">Categorie</button>
                <Transition name="slide-appear">
                    <div class="genres-list" v-if="show">
                        <button class="genre-badge" v-for="genre in state.genresList"
                            @click="getShowsByGenre(genre.id, genre.name)">{{
                                genre.name }}
                        </button>
                    </div>
                </Transition>
            </div>

            <!-- filter researched-show results by type (movie or serie) and by genre ()-->
            <div class="filters d-flex" v-else>
                <MediatypeFilter @filter-tv="filterByMediaType('tv')" @filter-movie="filterByMediaType('movie')"
                    @reset-btn="resetFilters()" />
                <CategoryFilter @use-filter="filterShows()" />
            </div>

            <!-- if a click on navbar "film"  -->
            <Transition name="fade-appear" :duration="600">
                <div class="film-page" v-if="state.allMovies.length > 0">
                    <div class="genre-name" v-for="genre in state.genresList">
                        <div class="results" v-if="state.allMovies[genre.id] && state.allMovies[genre.id].length > 0">
                            <!-- genre name -->
                            <h2>{{ genre.name }}</h2>
                            <!-- results as slides -->
                            <Carousel :itemsToShow="6.5" :wrapAround="true" :transition="500" :itemsToScroll="1"
                                snapAlign="start">
                                <Slide v-for="(movie, index) in state.allMovies[genre.id]" :key="index">
                                    <ResultCard :title="movie.title" :original_title="movie.original_title"
                                        :language="movie.original_language" :vote="movie.vote_average"
                                        :imageUrl="movie.poster_path" :overview="movie.overview" :id="movie.id"
                                        :type="movie.media_type" />
                                </Slide>

                                <template #addons>
                                    <Navigation />
                                    <Pagination />
                                </template>
                            </Carousel>
                        </div>


                    </div>
                </div>
            </Transition>

            <!-- if a click on navbar "serie"  -->
            <Transition name="fade-appear" :duration="600">
                <div class="serie-page" v-if="state.allSeries.length > 0">
                    <div class="genre-name" v-for="genre in state.genresList">
                        <div class="results" v-if="state.allSeries[genre.id] && state.allSeries[genre.id].length > 0">
                            <!-- genre name -->
                            <h2>{{ genre.name }}</h2>
                            <!-- results as slides -->
                            <Carousel :itemsToShow="6.5" :wrapAround="true" :transition="500" :itemsToScroll="1"
                                snapAlign="start">
                                <Slide v-for="(serie, index) in state.allSeries[genre.id]" :key="index">
                                    <ResultCard :title="serie.name" :original_title="serie.original_name"
                                        :language="serie.original_language" :vote="serie.vote_average"
                                        :imageUrl="serie.poster_path" :overview="serie.overview" :id="serie.id"
                                        :type="serie.media_type" />
                                </Slide>

                                <template #addons>
                                    <Navigation />
                                    <Pagination />
                                </template>
                            </Carousel>
                        </div>


                    </div>
                </div>
            </Transition>

            <!-- PAGE RENDER -->
            <!-- default page => most popular movies and series-->
            <div class="default-page"
                v-if="!showResults && state.totalResults !== 0 && state.moviesList.length === 0 && state.seriesList.length === 0 && state.allMovies.length === 0 && state.allSeries.length === 0">

                <DefaultPage />
            </div>

            <!-- results list -->
            <!-- if you search for a title and you get results -->
            <ul class="result-list list-inline row"
                v-else-if="showResults && state.moviesList.length === 0 && state.seriesList.length === 0">

                <ResultCard v-for="show in displayedResults"
                    :title="show.media_type === 'movie' ? show.title : show.name"
                    :original_title="show.media_type === 'movie' ? show.original_title : show.original_name"
                    :language="show.original_language" :vote="show.vote_average" :imageUrl="show.poster_path"
                    :overview="show.overview" :id="show.id" :type="show.media_type" />

            </ul>

            <!-- if no result is found -->
            <div class="no-results d-flex"
                v-else-if="state.totalResults === 0 && state.moviesList.length === 0 && state.seriesList.length === 0">
                <p>Nessun risultato trovato per la tua ricerca. Suggerimenti:</p>
                <ul>
                    <li>Prova con parole chiave diverse</li>
                    <li>Cerchi un film o una serie tv?</li>
                    <li>Prova a cercare il titolo di un film o di una serie tv</li>
                </ul>

            </div>

            <!-- if you search for a genre -->
            <div class="shows-genre-selected d-flex"
                v-else-if="state.moviesList.length !== 0 || state.seriesList.length !== 0">
                <GenreSelectedShows :chosenGenre="chosenGenre" />
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

    .pick-a-genre {
        gap: 1rem;

        .show-genres {
            align-self: flex-start;
            margin: 0.5rem 0;
            padding: 0.5rem;
            border-radius: 5px;
            border: 1px solid var(--bool-lighter);
            background-color: var(--bool-dark);
            color: var(--bool-lighter);
            font-size: 1.3rem;
            font-weight: bold;
            cursor: pointer;

            &:hover {
                background-color: var(--bool-lighter);
                color: var(--bool-dark);
            }

        }

        .genres-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            padding: 0.5rem 0 1rem 0;

            .genre-badge {
                border: 1px solid var(--bool-lighter);
                padding: 0.3rem;
                border-radius: 5px;
                background-color: var(--bool-dark);
                color: var(--bool-lighter);
                transition: 0.3s ease;
                cursor: pointer;

                &:hover {
                    background-color: var(--bool-lighter);
                    color: var(--bool-dark);
                }

                &:focus {
                    background-color: var(--bool-lighter);
                    color: var(--bool-dark);
                }
            }
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

    .shows-genre-selected {
        flex-direction: column;
        gap: 1rem;
    }

    .serie-page,
    .film-page {
        h2 {
            padding: 1rem 0;
        }

        li {
            list-style: none;
            padding: 0 0.2rem;
        }
    }

}

/* #transition */
/* categories: slide-appear */
.slide-appear-enter-active {
    transition: all 0.5s ease-out;
}

.slide-appear-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-appear-enter-from,
.slide-appear-leave-to {
    transform: translateX(-30px);
    opacity: 0;
}

/* film/serie btn: fade appear + slide for results*/
.fade-appear-enter-active,
.fade-appear-leave-active {
    transition: all 0.3s ease-in-out;

    .results {
        transition: all 0.3s ease-in-out;
        transition-delay: 0.25s;
    }
}

.fade-appear-enter-from {
    transform: translateY(30px);
    opacity: 0;

    .results {
        transform: translateX(30px);
        opacity: 0;
    }
}
</style>