<script>
import { state } from "../state.js"
import ResultCard from "./ResultCard.vue";
import CategoryFilter from "./CategoryFilter.vue"
import MediatypeFilter from "./MediatypeFilter.vue";
export default {
    name: "AppMain",
    components: {
        ResultCard,
        CategoryFilter,
        MediatypeFilter
    },
    data() {
        return {
            state: state,
            filteredShowsByCategory: [],
        }
    },
    methods: {
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
    }
}
</script>

<template>
    <div id="site_main">
        <div class="main-container">

            <!-- filters -->
            <div class="filters d-flex">
                <MediatypeFilter @filter-tv="filterByMediaType('tv')" @filter-movie="filterByMediaType('movie')"
                    @reset-btn="resetFilters()" />
                <CategoryFilter @use-filter="filterShows()" />
            </div>

            <!-- results list -->
            <ul class="result-list list-inline row" v-if="showResults">

                <ResultCard v-for="show in displayedResults"
                    :title="show.media_type === 'movie' ? show.title : show.name"
                    :original_title="show.media_type === 'movie' ? show.original_title : show.original_name"
                    :language="show.original_language" :vote="show.vote_average" :imageUrl="show.poster_path"
                    :overview="show.overview" :id="show.id" />

            </ul>
            <p class="no-results" v-else-if="state.totalResults === 0">Nessun risultato trovato</p>

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

}
</style>