//Add the post to the dashboard
const logout = async (event) => {
  //Prevent any default action from happening 
  event.preventDefault();
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out.');
  }
};

//Grab the selector for logout and call the function 
document
  .querySelector('#logout')
  .addEventListener('click', logout);


