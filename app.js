const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var trendingApi =
    'https://api.themoviedb.org/3/trending/all/day?api_key=21641388c9cca6cc9d6fc6249582022d';

var moviesApi = 
'https://api.themoviedb.org/3/movie/popular?api_key=21641388c9cca6cc9d6fc6249582022d&language=en-US&page=1';

var lastestApi = 
'https://api.themoviedb.org/3/movie/upcoming?api_key=21641388c9cca6cc9d6fc6249582022d&language=en-US&page=1';

var itemNumbers = 0;

const arrows = $$(".arrow");
const movieLists = $$(".movie-list");
const movieImg = $$("movie-list-item-img");
const ball = $(".toggle-ball");
const items = $$(".container,.menu-list-item,.movie-list-title,.navbar-container,.sidebar,.left-menu-icon,.toggle,.toggle-ball")

arrows.forEach((arrow,i) => {
    let clickCounter = 0;
    arrow.addEventListener("click",()=>{
        clickCounter++;
        const ratio = Math.floor(window.innerWidth / 270);
        if(itemNumbers - (6 + clickCounter) + (7 - ratio) >= 0){
            movieLists[i].style.transform =
         `translateX(${movieLists[i].computedStyleMap().get("transform")[0].x.value - 300}px)`;
        } else {
            movieLists[i].style.transform = "translateX(0)";
            clickCounter = 0;
        }
        
    });

});

ball.addEventListener("click",()=>{
    items.forEach(item=>{
        item.classList.toggle("active");
    })
})

console.log(movieImg)

const newrealeses = $(".newrealeases-list")
const trending = $(".trending-list")
const movies = $(".movies-list")


fetch(trendingApi)
    .then(function(response){
        return response.json();
    })
    .then(function(items){
         var htmls = items.results.map((item)=>{
            itemNumbers++;
            return `<div class="movie-list-item">
            <img class="movie-list-item-img" src="https://image.tmdb.org/t/p/original/${item.backdrop_path}" alt="">
            <span class="movie-list-item-title">${item.title || item.name}</span>
            <p class="movie-list-item-desc">${item.overview}</p>
            <button class="movie-list-item-button">Watch</button>
        </div>`
         });
         var html = htmls.join('');
         trending.innerHTML = html;
    });


    
fetch(moviesApi)
    .then(function(response){
        return response.json();
    })
    .then(function(items){
        var htmls = items.results.map((item,i)=>{
           return `<div class="movie-list-item">
           <img class="movie-list-item-img" src="https://image.tmdb.org/t/p/original/${item.backdrop_path}" alt="">
           <span class="movie-list-item-title">${item.title || item.name}</span>
           <p class="movie-list-item-desc">${item.overview}</p>
           <button class="movie-list-item-button">Watch</button>
       </div>`
        });
        var html = htmls.join('');
        movies.innerHTML = html;
    });

    fetch(lastestApi)
    .then(function(response){
        return response.json();
    })
    .then(function(items){
        var htmls = items.results.map((item,i)=>{
           return `<div class="movie-list-item">
           <img class="movie-list-item-img" src="https://image.tmdb.org/t/p/original/${item.backdrop_path}" alt="">
           <span class="movie-list-item-title">${item.title || item.name}</span>
           <p class="movie-list-item-desc">${item.overview}</p>
           <button class="movie-list-item-button">Watch</button>
       </div>`
        });
        var html = htmls.join('');
        newrealeses.innerHTML = html;
    });



