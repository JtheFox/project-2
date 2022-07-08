const $ = (sel) => document.querySelector(sel);

//Add the post to the dashboard
const favoriteAddHandler = async () => {
    // Add favorite button
    const addFavoriteBtn = $();
    
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

// Remove favorite button
const favoriteRemoveHandler = async () => {
    const removeFavoriteBtn = $();

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

const commentHandler = async (event) => {

    //Prevent any default action from happening 
    event.preventDefault();

    //Get the value of the text and title of blog post
    const comment_text = $("#commentText").value.trim();

    //Giving us access to the URL.
    const launch_id = window.location.toString().split("/")[window.location.toString().split("/").length - 1]

    //Send fetch request to add a new post 
    const createResponse = await fetch ("/api/comments", {

        //Read from POST method 
        method: "POST",

        //Convert data recieve to a string and display it on the page
        body: JSON.stringify({ comment_text, launch_id }),

        //Indicate the request body format is json
        headers: { "Content-Type": "application/json" }
    });

    //If the post is added, then the template will be re-rendered 
    createResponse.ok ? document.location.reload() : alert("Failed to add comment");
};

//Grab the selector for button and call the function 
$("#postComment").addEventListener("click", commentHandler);

// TODO: change query selectors
//Grab the selector for favorite and call the function 
document
    .querySelector('#login-form')
    .addEventListener('click', favoriteAddHandler);

document
    .querySelector('#login-form')
    .addEventListener('click', favoriteRemoveHandler);


