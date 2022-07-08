//Add the post to the dashboard
const loginFormHandler = async (event) => {
    //Prevent any default action from happening 
    event.preventDefault();

    
    //Get the value of the username and password of blog post
    const username = document.querySelector('#login-username').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    // Verify user and password
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
    }
};

//Grab the selector for login and call the function 
document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);
    

