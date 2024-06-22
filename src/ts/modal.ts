const $overlay: Types.Div = document.querySelector('#modal-overlay');
const $modalBackground: Types.Div = document.querySelector('#modal-background');
const $btnCancel: Types.Button = document.querySelector('#btn-cancel');

const $movieTitle: Types.Text = document.querySelector('#movie-title');
const $moviePoster: Types.Image = document.querySelector('#movie-poster');
const $moviePlot: Types.Text = document.querySelector('#movie-plot');
const $movieDirector: Types.Text = document.querySelector('#movie-director h5');
const $movieCast: Types.Text = document.querySelector('#movie-cast h5');
const $movieGenre: Types.Text = document.querySelector('#movie-genre h5');

let currentMovie: Types.Object;

function showModal(): void
{
    if($movieName && $movieYear)
    {
        $movieName.value = '';
        $movieYear.value = '';
        $btnSearch?.blur();
        $overlay?.classList.add('actived');
    }
}

function updateModal(data: any): void
{
    currentMovie = data;

    if($movieTitle && $moviePoster && $moviePlot && $movieDirector && $movieCast && $movieGenre)
    {
        $movieTitle.textContent = `${data.Title} - ${data.Year}`;
        $moviePoster.src = data.Poster;
        $moviePoster.alt = `Pôster de ${data.Title}.`;
        $moviePlot.textContent = data.Plot;
        $movieDirector.textContent = data.Director;
        $movieCast.textContent = data.Actors;
        $movieGenre.textContent = data.Genre;
    }
}

function hideModal(): void
{
    $overlay?.classList.remove('actived');
}

$modalBackground?.addEventListener('click', hideModal);
$btnCancel?.addEventListener('click', hideModal);