<script>
import { state } from "../state.js"
export default {
    name: "AppHeader",
    emits: ["reloadPage", "getFilmPage", "getSeriePage"],
    data() {
        return {
            state: state
        }
    },
    methods: {
        searchTitle() {
            state.getMoviesAndSeries();
            state.getAllGenres();
            state.userSearch = "";
            state.popularMovies = [],
                state.popularSeries = [],
                state.moviesList = [],
                state.seriesList = [],
                state.allMovies = [],
                state.allSeries = []
        }
    }
}
</script>

<template>
    <!-- site_header -->
    <div id="site_header">
        <nav class="d-flex">
            <!-- left: logo + list -->
            <div class="left-header d-flex">
                <div class="logo">
                    <img src="../assets/img/logo.png" alt="">
                </div>
                <i class="fa-solid fa-house d-none" @click="$emit('reloadPage')"></i>
                <ul class=" list-inline">
                    <li><a href="#" @click="$emit('reloadPage')">Home</a></li>
                    <li><a href="#" @click="$emit('getSeriePage')">Serie TV</a></li>
                    <li><a href="#" @click="$emit('getFilmPage')">Film</a></li>
                    <li><a href="#">Aggiunti di recente</a></li>
                    <li><a href="#">La mia lista</a></li>
                </ul>
            </div>

            <!-- right: searchbar + button -->
            <div class="right-header d-flex">
                <input type="search" id="searchbar" placeholder="Cerca un titolo..." v-model="state.userSearch"
                    @keyup.enter="searchTitle()">
                <button type="button" class="btn" @click="searchTitle()">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </nav>

    </div>
</template>



<style scoped>
#site_header {
    background-color: var(--bool-darker);
    padding: 1rem;
    color: var(--bool-lighter);
    position: fixed;
    width: 100%;
    height: 4rem;
    z-index: 100000;

    nav {
        justify-content: space-between;
        align-items: center;
        max-width: 1600px;
        margin: 0 auto;
        height: 100%;

        .left-header {
            gap: 1.5rem;
            align-items: center;
            height: 100%;

            .logo {
                color: var(--bool-danger);
                font-weight: bold;
                font-size: 1.5rem;
                height: 100%;

                img {
                    height: 100%;
                }
            }

            ul {
                gap: 0.7rem;
            }
        }

        .right-header {

            input {
                padding: 0.4rem;
                background-color: var(--bool-dark);
                color: var(--bool-lighter);
                border: 1px solid var(--bool-dark);

                &:focus {
                    outline-color: var(--bool-lighter);
                }
            }

            .btn {
                padding: 0.4rem;
                cursor: pointer;
                background-color: var(--bool-dark);
                border: none;
                color: var(--bool-lighter);
            }
        }
    }

}
</style>