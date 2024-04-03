import { reactive } from "vue";
import axios from "axios";

export const state = reactive({
    urlMovies: "https://api.themoviedb.org/3/search/movie",
    urlTvSeries: "https://api.themoviedb.org/3/search/tv",
    urlTitleImage: "https://image.tmdb.org/t/p/w342",
    API_KEY: "70a720a3fe7794c3aec73791756354ef",
    userSearch: "",
    movies: [],
    tvSeries: [],

    getMovies() {
        axios
            .get(`${this.urlMovies}?api_key=${this.API_KEY}&query=${this.userSearch}`)
            .then(response => {
                //console.log(response);
                this.movies = response.data.results;
                console.log(this.movies);
            })
    },
    getTvSeries() {
        axios
            .get(`${this.urlTvSeries}?api_key=${this.API_KEY}&query=${this.userSearch}`)
            .then(response => {
                //console.log(response);
                this.tvSeries = response.data.results;
                console.log(this.tvSeries);
            })
    }
})