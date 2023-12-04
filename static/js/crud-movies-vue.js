
const { createApp } = Vue;
createApp({
  data() {
    return {
        movies : [],
        api_server:"http://127.0.0.1:8000",
        id_movie:'',
        title:'',
        director:'',
        release_date:'',
        banner:null
    };
  },
  methods: {
    sendFormData(url, formData,method) {
        fetch(url, {
          method: method,
          body: formData,
        })
        .then((response) => response.json())
        .then((data) => {
            alert("Registro creado:");
            //Limpiar el formulario
            this.title='';
            this.director='';
            this.release_date='';
            this.banner=null;
            this.getMovies(`${this.api_server}/api/movies`);
        })
        .catch((error) => {
            console.error("Error al enviar el formulario:", error);
        });
    },
    onFileChange(event) {
        // Manejar el cambio en el input de tipo file
        this.banner = event.target.files[0];
    },
    getMovies() { // Metodo para buscar las peliculas en el servidor
        fetch(`${this.api_server}/api/movies/`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.movies = data;
            })
            .catch((err) => {
                console.error(err);
            });
    },
    getMovie(id_movie) {
        fetch(`${this.api_server}/api/movies/${id_movie}/`, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            this.id_movie = data.id;
            this.title = data.title;
            this.director = data.director,
            this.release_date = data.release_date
            console.log(data);
        })
        .catch((error) => {
            console.error("Error al enviar el formulario:", error);
        });
    },
   
    saveMovie() { // Para guardar una nueva pelicula o editar un pelicula existen
        const formData = new FormData();
        formData.append('title', this.title);
        formData.append('director', this.director);
        formData.append('release_date', this.release_date);
        formData.append('banner', this.banner);
        if(this.id_movie){ //Si existe el id_movie deberia hacer un update
            this.sendFormData(`${this.api_server}/api/update_movie/${this.id_movie}/`, formData,'PUT');
        }else{// Si no creo el registro en el backend
            this.sendFormData(`${this.api_server}/api/create_movie/`, formData,'POST');
        }
    },
    deleteMovie(id_movie) { // Eliminar pelicula del listado
        console.log('teasd');
        fetch(`${this.api_server}/api/delete_movie/${id_movie}/`, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
            alert("Registro Eliminado");
            //una vez eliminado listo todas las peliculas nuevamente.
            this.getMovies(`${this.api_server}/api/movies`);
        })
        .catch((error) => {
            console.error("Error al eliminar", error);
        });
    },
  },
  created() {
    this.getMovies();
  },
}).mount("#app");
