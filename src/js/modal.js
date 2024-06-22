"use strict";
const $overlay = document.querySelector('#modal-overlay');
const $modalBackground = document.querySelector('#modal-background');
const $btnCancel = document.querySelector('#btn-cancel');
const $movieTitle = document.querySelector('#movie-title');
const $moviePoster = document.querySelector('#movie-poster');
const $moviePlot = document.querySelector('#movie-plot');
const $movieDirector = document.querySelector('#movie-director h5');
const $movieCast = document.querySelector('#movie-cast h5');
const $movieGenre = document.querySelector('#movie-genre h5');
let currentMovie;
function showModal() {
    if ($movieName && $movieYear) {
        $movieName.value = '';
        $movieYear.value = '';
        $btnSearch?.blur();
        $overlay?.classList.add('actived');
    }
}
function updateModal(data) {
    currentMovie = data;
    if ($movieTitle && $moviePoster && $moviePlot && $movieDirector && $movieCast && $movieGenre) {
        $movieTitle.textContent = `${data.Title} - ${data.Year}`;
        $moviePoster.src = data.Poster;
        $moviePoster.alt = `Pôster de ${data.Title}.`;
        $moviePlot.textContent = data.Plot;
        $movieDirector.textContent = data.Director;
        $movieCast.textContent = data.Actors;
        $movieGenre.textContent = data.Genre;
    }
}
function hideModal() {
    $overlay?.classList.remove('actived');
}
$modalBackground?.addEventListener('click', hideModal);
$btnCancel?.addEventListener('click', hideModal);
