const noResultsMsg = 'No Results Found.';
const $ = (sel) => document.querySelector(sel);

const searchHandler = async () => {
    const response = await fetch('/search', {
        method: 'POST',
        body: JSON.stringify({ query: $('.search-bar').value }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response)

    if (response.ok) {
        $('.noResults').textContent = '';
    } else {
        const { message } = await response.json();
        console.log(response)
        $('.noResults').textContent = message;
    }
}

$('#postSearch').addEventListener('click', searchHandler);