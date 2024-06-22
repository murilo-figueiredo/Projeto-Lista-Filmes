"use strict";
async function getApiKey() {
    const response = await fetch('https://murilo-figueiredo.github.io/Projeto-Lista-Filmes/src/key/api-key.txt');
    const key = await response.text();
    return key;
}
