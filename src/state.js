import { reactive } from "vue";
import axios from "axios";

export const state = reactive({
    //urlMovies: "https://api.themoviedb.org/3/search/movie",
    //urlTvSeries: "https://api.themoviedb.org/3/search/tv",
    urlMovieAndSeries: "https://api.themoviedb.org/3/search/multi",
    urlTitleImage: "https://image.tmdb.org/t/p/w342",
    API_KEY: "70a720a3fe7794c3aec73791756354ef",
    userSearch: "",
    //movies: [],
    //tvSeries: [],
    results: [],
    actors: [],
    genres: [],
    moviesAndSeries: [],

    /* getMovies() {
        axios
            .get(`${this.urlMovies}?api_key=${this.API_KEY}&query=${this.userSearch}`)
            .then(response => {
                //console.log(response);
                this.movies = response.data.results;
                //console.log(this.movies); 
                
            })
    } */
    /* getTvSeries() {
        axios
            .get(`${this.urlTvSeries}?api_key=${this.API_KEY}&query=${this.userSearch}`)
            .then(response => {
                //console.log(response);
                this.tvSeries = response.data.results;
                //console.log(this.tvSeries);
            })
    }, */
    getMoviesAndSeries() {
        axios
            .get(`https://api.themoviedb.org/3/search/multi?api_key=${this.API_KEY}&query=${this.userSearch}`)
            .then(response => {
                console.log(response);
                this.results = response.data.results;
                //filtra solo serie tv o film
                let moviesAndSeries = this.results.filter(result => result.media_type === "movie" || result.media_type === "tv")
                console.log(moviesAndSeries);
                let actorsByShow = {};
                let genresByShow = {}

                //per ogni risultato che è un film o una serie tv, accedo a id e mediatype
                moviesAndSeries.forEach(show => {

                    //seconda chiamata axios per accedere ai credits
                    axios
                        .get(`https://api.themoviedb.org/3/${show.media_type}/${show.id}?api_key=${this.API_KEY}&append_to_response=credits`)
                        .then(response => {
                            //console.log(response.data);
                            //divido attori e generi per show altrimenti se assegno direttamente ad ogni giro mi sovrascrive l'array
                            actorsByShow[show.id] = response.data.credits.cast;
                            genresByShow[show.id] = response.data.genres

                            this.actors = actorsByShow;
                            this.genres = genresByShow;
                            //console.log(this.actors, this.genres);
                            //console.log(this.actors);
                        })
                })


            })
    },

    /* getActors(id) {
        axios
            .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${state.API_KEY}&append_to_response=credits`)
            .then(response => {
                console.log(response.data.credits.cast);
                this.actors = response.data.credits.cast
            })
    }, */
})