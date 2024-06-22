function errorNotification(message)
{
    notie.alert({
        type: 'error',
        text: message
    });
}

function confirmNotification(type, message, id)
{
    if(type === 'remove movie')
    {
        notie.confirm({
            text: message,
            submitText: 'Sim, remover',
            cancelText: 'Não, cancelar',
            submitCallback: () => {
                removeMovieSubmitOption(id);
            }
        });
    }
    else if(type === 'open imdb')
    {
        notie.confirm({
            text: message,
            submitText: 'Ok',
            cancelText: 'Cancelar',
            submitCallback: () => {
                openIMDbSubmitOption(id);
            }
        });
    }
}

function warningNotification(message)
{
    notie.force({
        type: 'warning',
        text: message,
        buttonText: 'Ok'
    });
}