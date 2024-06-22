"use strict";
function inputNameShortcut(event) {
    if (!$overlay?.classList.contains('actived')) {
        if (event.key === '/') {
            setTimeout(() => {
                $movieName?.focus();
            }, 1);
        }
    }
}
function searchShortcut(event) {
    if (document.activeElement === $movieName || document.activeElement === $movieYear) {
        if (event.key === 'Enter') {
            $btnSearch?.click();
            $movieName?.blur();
            $movieYear?.blur();
        }
    }
}
function addShortcut(event) {
    if ($overlay?.classList.contains('actived')) {
        if (event.altKey && event.key === 'a') {
            $btnAdd?.click();
        }
    }
}
function cancelShortcut(event) {
    if ($overlay?.classList.contains('actived')) {
        if (event.altKey && event.key === 'c') {
            $btnCancel?.click();
        }
    }
}
document.addEventListener('keydown', (event) => {
    inputNameShortcut(event);
    searchShortcut(event);
    addShortcut(event);
    cancelShortcut(event);
});
