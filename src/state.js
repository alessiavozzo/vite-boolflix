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
    totalResults: null,
    genresList: [],
    selectGenre: "",
    selectedType: "",
    popularMovies: [],
    popularSeries: [],
    moviesList: [],
    seriesList: [],
    allMovies: [],

    //In base al titolo cercato, metto in un unico array (results) tutti i risultati che hanno media type tv o movie (escludo person etc)
    //Per ogni elemento in results, faccio una chiamata che mi restituisce attori e generi di ogni show
    getMoviesAndSeries() {
        axios
            .get(`${this.urlMovieAndSeries}?api_key=${this.API_KEY}&query=${this.userSearch}`)
            .then(response => {
                //devo riazzerare il genere scelto ogni volta che faccio partire una funzione di ricerca di un titolo
                this.selectGenre = ""
                //devo riazzerare anche il tipo sennò alla nuova ricerca mi restituisce i risultati solo con la mediatype scelta
                this.selectedType = ""
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
    },

    getAllGenres() {
        axios
            .get(`https://api.themoviedb.org/3/genre/tv/list?&api_key=${this.API_KEY}`)
            .then(response => {
                //console.log(response.data.genres);
                let tvGenres = response.data.genres
                this.genresList = [...tvGenres]
                //console.log(this.genresList);
            })
        axios
            .get(`https://api.themoviedb.org/3/genre/movie/list?&api_key=${this.API_KEY}`)
            .then(response => {
                console.log(response.data.genres);
                let movieGenres = response.data.genres
                //per ogni movieGenre, controlla se ci sono tvGenre con lo stesso id di movie.Genre
                //se non c'è già l'id, pusha l'elemento nella lista dei generi
                movieGenres.forEach(movieGenre => {
                    if (!this.genresList.some(tvGenre => tvGenre.id === movieGenre.id)) {
                        this.genresList.push(movieGenre)
                    }
                })
                //console.log(this.genresList);
            })
    }
})