<script>
import AppHeader from "./components/AppHeader.vue"
import AppMain from "./components/AppMain.vue"
import { state } from "./state.js"
import axios from "axios";



export default {
  name: "App",
  components: {
    AppHeader,
    AppMain
  },
  data() {
    return {
      state: state
      /* allMovies: [] */
    }
  },
  methods: {
    reloadPage() {
      window.location.reload()
    },

    getAllMoviesGenreSorted() {
      console.log(state.genresList);
      state.genresList.forEach(genre => {
        axios
          .get(`https://api.themoviedb.org/3/discover/movie?&api_key=${state.API_KEY}&with_genres=${genre.id}`)
          .then(response => {
            console.log(genre);
            console.log(response.data.results);
            state.allMovies[genre.id] = response.data.results
            console.log(state.allMovies[genre.id]);
            console.log(state.allMovies);
          })
      })

    },
  }
}
</script>

<template>
  <AppHeader @reload-page="reloadPage()" @get-film-page="getAllMoviesGenreSorted()" />
  <AppMain />
</template>

<style scoped></style>
