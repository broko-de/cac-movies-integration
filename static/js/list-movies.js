/**
 * Funcion que permite crear un elemento <div> el contenedor de peliculas
 * por medio de la creación de nodos.
 */
function showMoviesDiv(){
  let movies = JSON.parse(localStorage.getItem('movies'));
  const divMovies = document.querySelector('#list-div-movies');
  divMovies.innerHTML='';
  movies.forEach((movie, index) => {
    const divContainer = document.createElement('div');
    
    const h3Info = document.createElement('h3');
    h3Info.innerText=`${movie.title} - ${movie.genre}`;
    divContainer.appendChild(h3Info);
    
    const button =  document.createElement('button');
    button.innerHTML='<i class="fa fa-trash" >';
    button.classList.add('btn-cac');
    button.addEventListener('click',()=>{
      deleteMovie(index);
    });

    divContainer.appendChild(button); 
    divContainer.classList.add('item-movie');

    divMovies.appendChild(divContainer);
  });
}

/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
function showMoviesTable(){
  let movies = JSON.parse(localStorage.getItem('movies'));
  const tableMovies = document.querySelector('#list-table-movies tbody');
  tableMovies.innerHTML='';
  movies.forEach((movie, index) => {
    let tr = `<tr>
                  <td>${movie.title}</td>
                  <td>${movie.genre}</td>
                  <td><button class="btn-cac" onclick='deleteMovie(${index})'><i class="fa fa-trash" ></button></i></td>
                </tr>`;
    tableMovies.insertAdjacentHTML("beforeend",tr);
  });
}

/**
 * funcion que permite agregar una pelicula al listado de peliculas
 * almacenado en el localstorage
 */
function addMovie(){
  const inputTitle = document.querySelector('#title');
  const inputGenre = document.querySelector('#genre');

  if(inputTitle.value !== '' && inputGenre.value !==''){
    //Obtiene el listado de peliculas del localstorage, en caso de no existir crea una array vacio
    let movies = JSON.parse(localStorage.getItem('movies')) || [];
    let newMovie = {
      title: inputTitle.value,
      genre: inputGenre.value,
    }
    movies.push(newMovie);
    //Se actualiza el array de peliculas en el localstorage
    localStorage.setItem('movies',JSON.stringify(movies));
    showMoviesTable();
    showMoviesDiv();
    //Limpieza de los campos del formulario
    inputTitle.value='';
    inputGenre.value='';
  }
}

/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} index posición del array que se va a eliminar
 */
function deleteMovie(index){
  let movies = JSON.parse(localStorage.getItem('movies'));
  if(movies[index]!=='undefined'){
    movies.splice(index,1);
    localStorage.setItem('movies',JSON.stringify(movies));
    showMoviesTable();
    showMoviesDiv();
  }
}

//Agregar eventos a elementos una vez que contenido haya sido cargado en el DOM
document.addEventListener('DOMContentLoaded', function() {
  const btnAddMovie = document.querySelector('#btn-add-movie');
  btnAddMovie.addEventListener('click',addMovie);
});

showMoviesDiv();
showMoviesTable();
