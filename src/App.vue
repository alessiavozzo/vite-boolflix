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
    }
  },
  methods: {
    reloadPage() {
      window.location.reload()
    },

    //mi serve che quando clicco su "film" mi restituisca un tot di film per ogni genere
    //per ogni genere (che già ho in genresList) fai una chiamata axios a discover (dove puoi specificare l'id del genere) e per ogni giro metti i risultati ottenuti in allMovies in posizione genre.id
    getAllMoviesGenreSorted() {
      console.log(state.genresList);
      state.genresList.forEach(genre => {
        axios
          .get(`https://api.themoviedb.org/3/discover/movie?&api_key=${state.API_KEY}&with_genres=${genre.id}`)
          .then(response => {
            //console.log(genre);
            //console.log(response.data.results);
            state.allMovies[genre.id] = response.data.results
            //console.log(state.allMovies[genre.id]);
            //console.log(state.allMovies);
          })
      })

    },

    //idem per le serie
    getAllSeriesGenreSorted() {
      console.log(state.genresList);
      state.genresList.forEach(genre => {
        axios
          .get(`https://api.themoviedb.org/3/discover/tv?&api_key=${state.API_KEY}&with_genres=${genre.id}`)
          .then(response => {
            //console.log(genre);
            console.log(response.data.results);
            state.allSeries[genre.id] = response.data.results
            //console.log(state.allMovies[genre.id]);
            //console.log(state.allMovies);
          })
      })
      state.allMovies = []

    },

  }
}
</script>

<template>
  <AppHeader @reload-page="reloadPage()" @get-film-page="getAllMoviesGenreSorted()"
    @get-serie-page="getAllSeriesGenreSorted()" />
  <AppMain />
</template>

<style scoped></style>
