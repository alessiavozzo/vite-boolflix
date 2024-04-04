import { reactive } from "vue";
import axios from "axios";

export const state = reactive({
    urlMovieAndSeries: "https://api.themoviedb.org/3/search/multi",
    urlTitleImage: "https://image.tmdb.org/t/p/w342",
    API_KEY: "70a720a3fe7794c3aec73791756354ef",
    userSearch: "",
    results: [],
    actors: [],
    genres: [],
    moviesAndSeries: [],
    totalResults: null,

    getMoviesAndSeries() {
        axios
            .get(`${this.urlMovieAndSeries}?api_key=${this.API_KEY}&query=${this.userSearch}`)
            .then(response => {
                console.log(response);
                this.totalResults = response.data.total_results
                console.log(this.totalResults);
                //filtro direttamente qui solo serie tv o film (altrimenti dopo quando ci ciclo sopra mi recuperare anche i risultati con media_type diverso da movie o tv e non renderizza, es se c'è media_type === person)
                this.results = response.data.results.filter(result => result.media_type === "movie" || result.media_type === "tv");
                console.log(this.results);

                let actorsByShow = {};
                let genresByShow = {};

                //per ogni risultato che è un film o una serie tv, accedo a id e mediatype
                this.results.forEach(show => {

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
    }
})