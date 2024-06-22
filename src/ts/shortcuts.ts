function inputNameShortcut(event: KeyboardEvent): void
{
    if(!$overlay?.classList.contains('actived'))
    {
        if(event.key === '/')
        {
            setTimeout(() => {
                $movieName?.focus();
            }, 1);
        }
    }
}

function searchShortcut(event: KeyboardEvent): void
{
    if(document.activeElement === $movieName || document.activeElement === $movieYear)
    {
        if(event.key === 'Enter')
        {
            $btnSearch?.click();
            $movieName?.blur();
            $movieYear?.blur();
        }
    }
}

function addShortcut(event: KeyboardEvent): void
{
    if($overlay?.classList.contains('actived'))
    {
        if(event.altKey && event.key === 'a')
        {
            $btnAdd?.click();
        }
    }
}

function cancelShortcut(event: KeyboardEvent): void
{
    if($overlay?.classList.contains('actived'))
    {
        if(event.altKey && event.key === 'c')
        {
            $btnCancel?.click();
        }
    }
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
    inputNameShortcut(event);
    searchShortcut(event);
    addShortcut(event);
    cancelShortcut(event);
});