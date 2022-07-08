const noResultsMsg = 'No Results Found.';
const $ = (sel) => document.querySelector(sel);

const searchHandler = async () => {
    const response = await fetch('/search', {
        method: 'POST',
        body: JSON.stringify({ query: $('.search-bar').value }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        $('.noResults').textContent = '';
    } else {
        $('.noResults').textContent = 'No Results Found.';
    }
}

$('#postSearch').addEventListener('click', searchHandler);