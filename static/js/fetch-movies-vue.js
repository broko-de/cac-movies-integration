const API_SERVER = 'https://api.themoviedb.org/3';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
    }
}

const moviesGridComponent = {
    template: `
            <div id="list-popular" class="movies-grid">
                <div class="movie-item" v-for="movie in movies">
                    <a href="./templates/detail-movie.html">
                        <img v-bind:src="'https://image.tmdb.org/t/p/w500/'+movie.poster_path" alt="" class="movie-item-img">
                        <div class="movie-item-detail">
                            <p class="movie-item-detail-title">{{movie.title}}</p>
                            <p class="movie-item-detail-subtitle">{{movie.release_date}} - {{movie.vote_average}}</p>                            
                        </div>
                    </a>
                </div>
            </div>
            <br>
            <div class="popular-buttons">
                <button class='btn-cac' v-on:click="fetchPrevMovies()">Anterior</button>
                <button class='btn-cac' v-on:click="fetchNextMovies()">Siguiente</button>
            </div> 
    `,
    data() {
        return {
            movies:[],
            page: 1,
            total_pages:1,
        }
    },
    created(){
        this.fetchMovies();
    },
    methods:{
        async fetchMovies(){
            const response = await fetch(`${API_SERVER}/movie/popular?page=${this.page}`,options);
            const data = await response.json();
            this.movies = data.results
            this.total_pages = data.total_pages
        },
        async fetchNextMovies(){
            if(this.page < this.total_pages){
                this.page++;
                const response = await fetch(`${API_SERVER}/movie/popular?page=${this.page}`,options);
                const data = await response.json();
                this.movies = data.results
            }
        },
        async fetchPrevMovies(){
            if(this.page>1){
                this.page--;
                const response = await fetch(`${API_SERVER}/movie/popular?page=${this.page}`,options);
                const data = await response.json();
                this.movies = data.results
            }
            
        }
    }
}

const moviesFlexComponent = {
    template: `
            <div id="list-top-rated" class="movies-flex movies-scroller">
                <div class="movie-item-v2" v-for="movie in movies">
                    <div class="wrapper">
                        <img v-bind:src="'https://image.tmdb.org/t/p/w500/'+movie.poster_path" alt="" class="movie-item-img-v2">                        
                    </div>
                    <div class="movie-item-detail-v2">
                        <p class="movie-item-detail-title-v2">{{movie.title}}</p>
                        <p class="movie-item-detail-subtitle-v2">{{movie.release_date}} - {{movie.vote_average}}</p>
                    </div>
                </div>
            </div>
    `,
    data() {
        return {
            movies:[],
        }
    },
    created(){
        this.fetchMovies();
    },
    methods:{
        async fetchMovies(){
            const response = await fetch(`${API_SERVER}/movie/top_rated`,options);
            const data = await response.json();
            this.movies = data.results
        },
    }
}
const { createApp } = Vue


createApp({
    components : {
        'movies-grid':moviesGridComponent,
        'movies-flex':moviesFlexComponent,
    }
}).mount("#app")