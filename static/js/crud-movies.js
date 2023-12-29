/**
 * Funcion que permite crear un elemento <div> el contenedor de peliculas
 * por medio de la creación de nodos.
 */
function showMoviesNodes(){
    let movies = JSON.parse(localStorage.getItem('movies'));
    const divMovies = document.querySelector('#list-div-movies');
    divMovies.innerHTML='';
    movies.forEach((movie, index) => {
        // Crear elementos de nodo 
        let tr = document.createElement('tr');
        let tdTitle = document.createElement('td');
        let tdDirector = document.createElement('td');
        let tdReleaseDate = document.createElement('td');
        let tdBanner = document.createElement('td');
        let tdButton = document.createElement('td');
        let button = document.createElement('button');
        let icon = document.createElement('i');
    
        // Configurar contenido y atributos
        tdTitle.textContent = movie.title;
        tdDirector.textContent = movie.director;
        tdReleaseDate.textContent = movie.release_date;
        tdBanner.innerHTML = `<img src="${movie.banner}" alt="${movie.title}" width="30%">`;
        button.className = 'btn-cac';
        button.onclick = function() {
          deleteMovie(index);
        };
        icon.className = 'fa fa-trash';
    
        // Construir la estructura del nodo
        button.appendChild(icon);
        tdButton.appendChild(button);
    
        tr.appendChild(tdTitle);
        tr.appendChild(tdDirector);
        tr.appendChild(tdReleaseDate);
        tr.appendChild(tdReleaseDate);
        tr.appendChild(tdBanner);
    
        // Agregar la fila a la tabla
        tableMovies.appendChild(tr);
    });
}
  
/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
function showMoviesTemplate(){
  let movies = JSON.parse(localStorage.getItem('movies'));
  const tableMovies = document.querySelector('#list-table-movies tbody');
  tableMovies.innerHTML='';
  movies.forEach((movie, index) => {
    let tr = `<tr>
                  <td>${movie.title}</td>
                  <td>${movie.director}</td>
                  <td>${movie.release_date}</td>
                  <td><img src="${movie.banner}" alt="${movie.title}" width="30%"></td>
                  <td>
                    <button class="btn-cac" onclick='updateMovie(${movie.id})'><i class="fa fa-pencil" ></button></i>
                    <button class="btn-cac" onclick='deleteMovieAlert(${movie.id})'><i class="fa fa-trash" ></button></i>
                    </td>
                </tr>`;
    tableMovies.insertAdjacentHTML("beforeend",tr);
  });
}
  
/**
 * funcion que permite agregar o modificar una pelicula al listado de peliculas
 * almacenado en el localstorage
 */
function saveMovie(){
  const form = document.querySelector('#form-movie');

  const inputId = document.querySelector('#id-movie');
  const inputTitle = document.querySelector('#title');
  const inputDirector = document.querySelector('#director');
  const inputReleaseDate = document.querySelector('#release-date');
  const inputBanner = document.querySelector('#banner-form');

  if(inputTitle.value !== '' && inputDirector.value !=='' && inputReleaseDate.value !=='' && inputBanner.value !==''){
    //Obtiene el listado de peliculas del localstorage, en caso de no existir crea una array vacio
    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    
    if(inputId.value!==""){
      let movieFind = movies.find(movie => movie.id == inputId.value);
      if (movieFind) {
        movieFind.title = inputTitle.value;
        movieFind.director = inputDirector.value;
        movieFind.release_date = inputReleaseDate.value;
        movieFind.banner = inputBanner.value;
      }
    }else{
      let newMovie = {
        id: Object.keys(movies).length+1,
        title: inputTitle.value,
        director: inputDirector.value,
        release_date: inputReleaseDate.value,
        banner: inputBanner.value,
      }
      movies.push(newMovie);
    }
    //Se actualiza el array de peliculas en el localstorage
    localStorage.setItem('movies',JSON.stringify(movies));
    showMoviesTemplate();
    //Limpieza de los campos del formulario
    // inputTitle.value='';
    // inputDirector.value='';
    // inputReleaseDate.value='';
    // inputBanner.value='';
    form.reset();
    Swal.fire({
        title: 'Exito!',
        text: 'Operacion exitosa.',
        icon: 'success',
        confirmButtonText: 'Cerrar'
    })
  }else{
    Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
  }
}

/**
 * Function que permite cargar el formulario para editar una pelicula
 * de acuedo al id de la pelicula
 * @param {number} movieId id movie que se va a actualizar
 */
function updateMovie(movieId){
  let movies = JSON.parse(localStorage.getItem('movies'));
  //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
  let movieToUpdate = movies.find(movie => movie.id===movieId);
  if(movieToUpdate){
    const inputId = document.querySelector('#id-movie');
    const inputTitle = document.querySelector('#title');
    const inputDirector = document.querySelector('#director');
    const inputReleaseDate = document.querySelector('#release-date');
    const inputBanner = document.querySelector('#banner-form');
    inputId.value = movieToUpdate.id;
    inputTitle.value = movieToUpdate.title;
    inputDirector.value = movieToUpdate.director;
    inputReleaseDate.value = movieToUpdate.release_date;
    inputBanner.value = movieToUpdate.banner;
  }
}

/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} movieId id movie que se va a eliminar
 */
function deleteMovie(movieId){
  let movies = JSON.parse(localStorage.getItem('movies'));
  //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
  let movieToDelete = movies.find(movie => movie.id===movieId);
  if(movieToDelete){
    //se utiliza el metodo filter para actualizar el array de movies, sin tener el elemento encontrado en cuestion.
    movies = movies.filter(movie => movie.id !== movieToDelete.id);
    //se actualiza el localstorage
    localStorage.setItem('movies',JSON.stringify(movies));
    showMoviesTemplate();
  }
}

/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo por medio de sweet alert
 * @param {number} movieId id movie que se va a eliminar
 */
function deleteMovieAlert(movieId){
  let movies = JSON.parse(localStorage.getItem('movies'));
  //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
  let movieToDelete = movies.find(movie => movie.id===movieId); 

  if(movieToDelete){
      Swal.fire({
          title: "Esta seguro de eliminar la pelicula?",
          showCancelButton: true,
          confirmButtonText: "Eliminar",
      }).then((result) => {
          if (result.isConfirmed) {
            //se utiliza el metodo filter para actualizar el array de movies, sin tener el elemento encontrado en cuestion.
            movies = movies.filter(movie => movie.id !== movieToDelete.id);
            //se actualiza el localstorage
            localStorage.setItem('movies',JSON.stringify(movies));
            showMoviesTemplate();
            Swal.fire("Pelicula Eliminada!", "", "success");
          }
      });
  }else{
      Swal.fire({
          title: 'Error!',
          text: 'No se puede eliminar la pelicula.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      })
  }
}


//Agregar eventos a elementos una vez que contenido haya sido cargado en el DOM
document.addEventListener('DOMContentLoaded', function() {
  const btnSaveMovie = document.querySelector('#btn-save-movie');
  btnSaveMovie.addEventListener('click',saveMovie);
});

//   showMoviesNodes();
showMoviesTemplate();
  