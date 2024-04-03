<script>
import { state } from "../state.js"
export default {
    name: "AppHeader",
    data() {
        return {
            state: state
        }
    },
    methods: {
        searchTitle() {
            state.getMovies();
            state.getTvSeries();
            state.userSearch = "";
        }
    }
}
</script>

<template>
    <!-- site_header -->
    <div id="site_header">
        <div class="container-header d-flex">
            <!-- left: logo + list -->
            <div class="left-header d-flex">
                <div class="logo">BOOLFLIX</div>
                <ul class="list-inline">
                    <li>Home</li>
                    <li>Serie TV</li>
                    <li>Film</li>
                    <li>Aggiunti di recente</li>
                    <li>La mia lista</li>
                </ul>
            </div>

            <!-- right: searchbar + button -->
            <div class="right-header d-flex">
                <input type="search" placeholder="Cerca un titolo..." v-model="state.userSearch"
                    @keyup.enter="searchTitle()">
                <button type="button" class="btn" @click="searchTitle()">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>
        </div>

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

    .container-header {
        justify-content: space-between;
        align-items: center;
        max-width: 1600px;
        margin: 0 auto;

        .left-header {
            gap: 1rem;
            align-items: center;

            .logo {
                color: var(--bool-danger);
                font-weight: bold;
                font-size: 1.5rem;
            }

            ul {
                gap: 0.7rem;
            }
        }

        .right-header {

            input {
                padding: 0.4rem;

                &:focus {
                    outline-color: var(--bool-danger);
                }
            }

            .btn {
                padding: 0.4rem;
            }
        }
    }

}
</style>