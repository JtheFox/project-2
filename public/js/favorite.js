const favoriteAddHandler = async () => {
    const addFavoriteBtn = document.querySelector();

    if (addFavoriteBtn) {
        const launch_id = document.location.pathname.split('/').at(-1);
        const response = await fetch('/api/favorites', {
            method: 'POST',
            body: JSON.stringify({ launch_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            alert('Failed to add favorite');
        }
    }
}

const favoriteRemoveHandler = async () => {
    const removeFavoriteBtn = document.querySelector();

    if (removeFavoriteBtn) {
        const launch_id = document.location.pathname.split('/').at(-1);
        const response = await fetch('/api/favorites', {
            method: 'DELETE',
            body: JSON.stringify({ launch_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            alert('Failed to add favorite');
        }
    }
}

// TODO: change query selectors
document
    .querySelector('#login-form')
    .addEventListener('click', favoriteAddHandler);

document
    .querySelector('#login-form')
    .addEventListener('click', favoriteRemoveHandler);


