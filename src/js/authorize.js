function authorizeUser() {
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = `${window.location.href}playlist.html`;

  const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}`;

  window.location = url;
}

document
  .getElementById('login-button')
  .addEventListener('click', authorizeUser);
