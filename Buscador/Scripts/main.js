const search = document.getElementById("search");
const boton1 = document.getElementById("boton1");
const boton2 = document.getElementById("boton2");
const ratingOption = document.getElementById("rating-option");
const moviesListHome = document.getElementById("movies-list-home");
const moviesDiv = document.getElementById("movies");
const moviesList = document.getElementById("movies-list");
const image=`http://image.tmdb.org/t/p/w500`;
const logo = document.getElementById("logo");
const table = document.getElementsByClassName("table");
const bar = document.getElementById("bar");
const genresButton = document.getElementsByClassName("botonGenre");

let genres = ["28","12","16","35","80","99","18","10751","14","36","27","10402","9648","10749","878","53","10752","37"];
let genreList = new Array();
let ratingChoice="&vote_average.gte=3";
const API_ONLOAD =`https://api.themoviedb.org/3/discover/movie?api_key=11c6235831bfcf4e28ee2f286f7ef58e&sort_by=vote_average.asc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`
// &vote_average.gte=8
// &with_genres= 12



logo.addEventListener("click",function(){location.reload()});

SearchInHome();


for(let i=0;i<genresButton.length;i++){
  genresButton[i].classList.add('unpressed');
genresButton[i].addEventListener("click",

function(){
  if (genresButton[i].classList.contains('pressed')){
    genresButton[i].classList.remove('pressed');
    genresButton[i].classList.add('unpressed');
    genreList[i]="";
    console.log(genreList);
    SearchInHome();

  }else if (genresButton[i].classList.contains('unpressed')){
  genresButton[i].classList.remove('unpressed');  
  genresButton[i].classList.add('pressed')
  genreList[i]=genres[i];
  console.log(genreList);
  SearchInHome();

  }
  }
  );
  

}

function SearchInHome(){
  while(moviesListHome.firstChild){
    moviesListHome.removeChild(moviesListHome.firstChild);
  
  } 
Home(genreList,ratingChoice)
.then((data) => {
    // Process results from API
    if (data && data.results) {

      // Iterate list of movies and render each of them
      data.results.forEach((movie) => {

        if(movie.poster_path){
        renderMovieHome(movie.poster_path,movie.original_title);
        }
      })
    }
  })
  .catch((err) => {
    console.error(err+"Hola");
  })
  
}




function Home(list,rat){
  return fetch(API_ONLOAD + '&with_genres=' + list+ rat)
    .then(response => response.json())

    
}


function Inicio (boton){
boton.classList.add('unpressed');
}

Inicio(boton1);
Inicio(boton2);

search.addEventListener("click",function(){submitForm()});

boton1.addEventListener("click",function(){
   
    CambioDeColor(boton1,boton2);
    
})

boton2.addEventListener("click",function(){
  
    CambioDeColor(boton2,boton1);
   
    
})


function CambioDeColor(botonn1,botonn2){

    if (botonn1.classList.contains('unpressed')){
    botonn1.classList.remove('unpressed');
    botonn1.classList.add('pressed');
    
    if (botonn1==boton1){
      ratingChoice="&vote_average.gte=7"
      
      SearchInHome();
     
        }
   if (botonn1==boton2){
    ratingChoice="&vote_average.lte=7"
    
    SearchInHome();
   
    }
       
    } else {
    botonn1.classList.remove('pressed');
    botonn1.classList.add('unpressed');
    ratingChoice="&vote_average.gte=3";
    SearchInHome();
    
 
    }

    if (botonn2.classList.contains('pressed')){
        botonn2.classList.remove('pressed');
        botonn2.classList.add('unpressed');
        SearchInHome();
        }
        
}

// Config
const API_ENDPOINT = `https://api.themoviedb.org/3/search/movie?api_key=11c6235831bfcf4e28ee2f286f7ef58e`

// Make a request to API
function searchMovies(query) {
  return fetch(API_ENDPOINT + '&query=' + query)
    .then(response => response.json())
}


// Handle the submit form action
// Make a request to API and render results
function submitForm() {
  moviesDiv.classList.remove("void");
  bar.classList.add("void");

   while(moviesList.firstChild){
     moviesList.removeChild(moviesList.firstChild);
   }
  
   
   console.log("se eliminó");



  // ratingOption.parentNode.removeChild(ratingOption);

  // Get query value
  const query = document.getElementById("query").value;

  // Execute API request
  searchMovies(query)
    .then((data) => {

      // Process results from API
      if (data && data.results) {

        // Iterate list of movies and render each of them
        data.results.forEach((movie) => {
          
          renderMovie(movie.original_title, movie.overview,movie.vote_average,movie.poster_path,movie.release_date)
          console.log("render1");
        })
      }
    })
    .catch((err) => {
      console.error(err)
    })
}


function renderMovieHome(poster,title){
  const htmlHome = `
  <div class="container">
  <img src="${image+poster}"  class="posterHome">
  <div class="overlay">
    <div class="text">${title}</div>
  </div>
</div>`;
  moviesListHome.insertAdjacentHTML("beforeend",htmlHome);
}

// Render a movie in the page
function renderMovie(title, overview,rating,poster,date) {



  
  const html = `
  <div class ="table">
    <div class="movie-box">
      <div class="details">
        <div class="title">${title}</div>
        <img class="image poster" src=${image+poster}>
          <div class="overview-box">
          
            <div class="overview">${overview}</div>
            <div class="date">Fecha de lanzamiento: ${date}</div>
          </div>
      </div> 
      <div class="rating-box">
        <div class="rating">${rating}</div>
        </div>
    </div>
    
  </div>
    
  `;
  
  

  moviesList.insertAdjacentHTML("afterbegin", html);
  // usar if y comprobar si fue la ultima pelicula y adjuntar el div de la página
  // moviesList.insertAdjacentHTML("afterend", html);
  console.log("render2");
  
}