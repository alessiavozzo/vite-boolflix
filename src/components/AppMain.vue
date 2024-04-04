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
            state: state,
        }
    }
}
</script>

<template>
    <div id="site_main">
        <div class="list-container">

            <ul class="result-list list-inline row" v-if="state.totalResults > 0">

                <ResultCard v-for="show in state.results " :title="show.media_type === 'movie' ? show.title : show.name"
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

    .list-container {
        padding: 5rem 1rem;
        max-width: 1600px;
        margin: 0 auto;
        color: var(--bool-lighter);

        ul {
            flex-wrap: wrap;
            justify-content: center;
            gap: 0.2rem;
        }
    }

}
</style>