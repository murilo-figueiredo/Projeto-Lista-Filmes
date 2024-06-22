"use strict";
const $title = document.querySelector('main .title');
const $btnAdd = document.querySelector('#btn-add');
const $movieList = document.querySelector('#movie-list');
let $movieCard;
let $movieLink;
let movieList = [];
let storedMovieList = localStorage.getItem('movieList');
if (storedMovieList) {
    storedMovieList = JSON.parse(storedMovieList);
    if (Array.isArray(storedMovieList)) {
        movieList = storedMovieList;
    }
}
updateTitle();
for (const movie of movieList) {
    createCard(movie);
}
function updateTitle() {
    if ($title) {
        if (movieList.length === 0) {
            $title.textContent = 'Comece agora a sua lista de filmes!';
        }
        else {
            $title.textContent = 'Esta é a sua lista de filmes!';
        }
    }
}
function isThisMovieAlreadyOnList(id) {
    function doesThisIdBelongsToThisMovie(movieObject) {
        return movieObject.imdbID === id;
    }
    return Boolean(movieList.find(doesThisIdBelongsToThisMovie));
}
function addToList(movieObject) {
    movieList.push(movieObject);
}
function createCard(movieObject) {
    if ($movieList) {
        $movieList.innerHTML += `
            <article id="movie-card-${movieObject.imdbID}">
                <img title="${movieObject.Title} - ${movieObject.Year}" src="${movieObject.Poster}" alt="Pôster de ${movieObject.Title}." onclick="openIMDb('${movieObject.Title}', '${movieObject.imdbID}')">
                
                <a href="https://imdb.com/title/${movieObject.imdbID}" id="movie-link-${movieObject.imdbID}" target="_blank"></a>

                <button class="btn-remove" onclick="removeMovie('${movieObject.Title}', '${movieObject.imdbID}')"><i class="bi bi-trash3-fill"></i> Remover da Lista</button>
            </article>
        `;
    }
    updateTitle();
}
function addCurrentMovie() {
    if (!isThisMovieAlreadyOnList(currentMovie.imdbID)) {
        addToList(currentMovie);
        updateLocalStorage();
        createCard(currentMovie);
        hideModal();
        return;
    }
    warningNotification('Este filme já está na sua lista.');
}
function openIMDb(title, id) {
    confirmNotification('open imdb', `Isso irá abrir a página do IMDb do título "${title}".`, id);
}
function removeMovie(title, id) {
    confirmNotification('remove movie', `Deseja mesmo remover o título "${title}" da sua lista?`, id);
}
function openIMDbSubmitOption(id) {
    $movieLink = document.querySelector(`#movie-link-${id}`);
    if ($movieLink) {
        $movieLink.click();
    }
}
function removeMovieSubmitOption(id) {
    $movieCard = document.querySelector(`#movie-card-${id}`);
    if ($movieCard) {
        $movieCard.classList.add('removed');
        setTimeout(() => {
            if ($movieCard) {
                $movieCard.remove();
            }
        }, 500);
        movieList = movieList.filter(movie => movie.imdbID !== id);
        updateTitle();
        updateLocalStorage();
    }
}
function updateLocalStorage() {
    localStorage.setItem('movieList', JSON.stringify(movieList));
}
$btnAdd?.addEventListener('click', addCurrentMovie);
