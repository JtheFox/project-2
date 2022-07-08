//Add the post to the dashboard
const signupFormHandler = async (event) => {
    //Prevent any default action from happening 
    event.preventDefault();

    //Get the value of the username and password of blog post
    const username = document.querySelector('#signup-username').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    // Verify user and password
    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};

//Grab the selector for signup and call the function 
document
    .querySelector('#signup-form')
    .addEventListener('submit', signupFormHandler);

