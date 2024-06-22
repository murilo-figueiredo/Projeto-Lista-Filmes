"use strict";
const $movieName = document.querySelector('#movie-name');
const $movieYear = document.querySelector('#movie-year');
const $btnSearch = document.querySelector('#btn-search');
let movieName;
let movieYear;
let url;
function returnMovieName() {
    if ($movieName?.value === '' || $movieName?.value === null) {
        throw new Error('O nome do filme deve ser informado.');
    }
    else if ($movieName) {
        return ($movieName.value.replaceAll(' ', '+'));
    }
    return '';
}
function returnMovieYear() {
    if (($movieYear?.value === '' || $movieYear?.value === null)) {
        return '';
    }
    else if ($movieYear?.value.length !== 4 || parseFloat($movieYear?.value) <= 0) {
        throw new Error('O ano inserido é inválido.');
    }
    else if ($movieYear) {
        return ($movieYear.value);
    }
    return '';
}
async function requestMovie() {
    try {
        const key = await getApiKey();
        movieName = returnMovieName();
        movieYear = returnMovieYear();
        console.log('key: ', key);
        url = `http://www.omdbapi.com/?apikey=${key}&t=${movieName}&y=${movieYear}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.Error) {
            throw new Error('Filme não encontrado.');
        }
        updateModal(data);
        showModal();
    }
    catch (error) {
        errorNotification(error.message);
    }
}
$btnSearch?.addEventListener('click', requestMovie);
