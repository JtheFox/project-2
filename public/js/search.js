//Add the post to the dashboard
const noResultsMsg = 'No Results Found.';
const $ = (sel) => document.querySelector(sel);

// Search Handler
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

//Grab the selector for search and call the function 
$('#postSearch').addEventListener('click', searchHandler);