declare function confirmNotification(type: string, message: string, id: string): void;
declare function warningNotification(message: string): void;

const $title: Types.Text = document.querySelector('main .title');
const $btnAdd: Types.Button = document.querySelector('#btn-add');
const $movieList: Types.Div = document.querySelector('#movie-list');
let $movieCard: Types.Div;
let $movieLink: Types.Anchor;

let movieList: Types.Object[] = [];
let storedMovieList: Types.Item = localStorage.getItem('movieList');
if(storedMovieList) {
    storedMovieList = JSON.parse(storedMovieList);
    if(Array.isArray(storedMovieList)) { movieList = storedMovieList; }
}

updateTitle();

for(const movie of movieList)
{
    createCard(movie);
}

function updateTitle()
{
    if($title)
    {
        if(movieList.length === 0)
        {
            $title.textContent = 'Comece agora a sua lista de filmes!';
        }
        else
        {
            $title.textContent = 'Esta é a sua lista de filmes!';
        }
    }
}

function isThisMovieAlreadyOnList(id: string): boolean
{
    function doesThisIdBelongsToThisMovie(movieObject: Types.Object): boolean
    {
        return movieObject.imdbID === id;
    }
    
    return Boolean(movieList.find(doesThisIdBelongsToThisMovie));
}

function addToList(movieObject: Types.Object): void
{
    movieList.push(movieObject);
}

function createCard(movieObject: Types.Object): void
{
    if($movieList)
    {
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

function addCurrentMovie(): void
{
    if(!isThisMovieAlreadyOnList(currentMovie.imdbID))
    {
        addToList(currentMovie);
        updateLocalStorage();
        createCard(currentMovie);
        hideModal();
        
        return;
    }
    
    warningNotification('Este filme já está na sua lista.');
}

function openIMDb(title: string, id: string): void
{
    confirmNotification('open imdb', `Isso irá abrir a página do IMDb do título "${title}".`, id);
}

function removeMovie(title: string, id: string): void
{
    confirmNotification('remove movie', `Deseja mesmo remover o título "${title}" da sua lista?`, id);
}

function openIMDbSubmitOption(id: string)
{
    $movieLink = document.querySelector(`#movie-link-${id}`);
    
    if($movieLink) { $movieLink.click(); }
}

function removeMovieSubmitOption(id: string): void
{
    $movieCard = document.querySelector(`#movie-card-${id}`);
    
    if($movieCard)
    {
        $movieCard.classList.add('removed');
        setTimeout((): void => {
            if($movieCard){ $movieCard.remove(); } 
        }, 500);
        
        movieList = movieList.filter(movie => movie.imdbID !== id);

        updateTitle();
        updateLocalStorage();
    }
}

function updateLocalStorage()
{
    localStorage.setItem('movieList', JSON.stringify(movieList));
}

$btnAdd?.addEventListener('click', addCurrentMovie);