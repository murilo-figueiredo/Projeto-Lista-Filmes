declare function errorNotification(message: string): void;

const $movieName: Types.Input = document.querySelector('#movie-name');
const $movieYear: Types.Input = document.querySelector('#movie-year');
const $btnSearch: Types.Button = document.querySelector('#btn-search');
let movieName: string;
let movieYear: string;
let url: string;

function returnMovieName(): string
{
    if($movieName?.value === '' || $movieName?.value === null)
    {
        throw new Error('O nome do filme deve ser informado.');
    }
    else if($movieName)
    {
        return ($movieName.value.replaceAll(' ', '+'));
    }

    return '';
}

function returnMovieYear(): string
{
    if(($movieYear?.value === '' || $movieYear?.value === null))
    {
        return '';
    }
    else if($movieYear?.value.length !== 4 || parseFloat($movieYear?.value) <= 0)
    {
        throw new Error('O ano inserido é inválido.');
    }
    else if($movieYear)
    {
        return ($movieYear.value);
    }

    return '';
}

async function requestMovie(): Promise<void>
{
    try
    {
        movieName = returnMovieName();
        movieYear = returnMovieYear();
        url = `http://www.omdbapi.com/?apikey=${key}&t=${movieName}&y=${movieYear}`;
        
        const response: Response = await fetch(url);
        const data: any = await response.json();
        
        if(data.Error)
        {
            throw new Error('Filme não encontrado.');
        }

        updateModal(data);
        showModal();
    }
    catch(error: any)
    {
        errorNotification(error.message);
    }
}

$btnSearch?.addEventListener('click', requestMovie);