/* DOM utilities */

function removeNodeContent(node) {
  while (node.firstChild) {
    node.removeChild(node.lastChild);
  }
}

const previewAttribute = 'data-src';

/* URL utilities */

function getHashParams() {
  const hash = window.location.hash.substring(1);
  const values = hash.split('&');

  return Object.fromEntries(values.map((v) => v.split('=')));
}

function getAccessToken() {
  return getHashParams().access_token;
}

function getPlaylist(playlistId) {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}`;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`,
  };

  return fetch(url, { headers }).then((response) => response.json());
}

/* Get Playlist */

function renderPlaylist(playlistId) {
  const container = document.getElementById('tracks');
  removeNodeContent(container);

  getPlaylist(playlistId).then((response) => {
    let playlistGrid = document.createDocumentFragment();

    response.tracks.items.forEach((item) => {
      const trackContainer = document.createElement('div');
      trackContainer.classList.add('playlist-item');

      if (item.track.preview_url) {
        trackContainer.setAttribute(previewAttribute, item.track.preview_url);
      }

      const trackImage = document.createElement('img');
      trackImage.classList.add('playlist-item-img');
      trackImage.setAttribute('src', item.track.album.images[0].url);

      const trackTitle = document.createElement('div');
      trackTitle.classList.add('playlist-item-title');
      trackTitle.innerHTML = item.track.name;

      trackContainer.appendChild(trackImage);
      trackContainer.appendChild(trackTitle);
      playlistGrid.appendChild(trackContainer);
    });

    container.appendChild(playlistGrid);
  });
}

/* Play previews */

function createPlayPreview() {
  let currentlyActive;
  const audioPlayer = document.getElementById('audio-player');

  return (node) => {
    let trackNode = node;

    while (
      !trackNode.classList.contains('playlist-item') &&
      trackNode.parentNode
    ) {
      trackNode = node.parentNode;
    }

    if (trackNode) {
      if (currentlyActive) {
        currentlyActive.classList.remove('active');
      }
      if (trackNode === currentlyActive) {
        currentlyActive = null;
        audioPlayer.pause();
      } else {
        trackNode.classList.add('active');
        currentlyActive = trackNode;
        const previewUrl = trackNode.getAttribute(previewAttribute);
        if (previewUrl) {
          audioPlayer.setAttribute('src', previewUrl);
          audioPlayer.play();
        } else {
          audioPlayer.pause();
        }
      }
    }
  };
}

const playPreview = createPlayPreview();

document.addEventListener('click', (event) => {
  playPreview(event.target);
});

/* Render */

renderPlaylist('37i9dQZF1DX3rxVfibe1L0');
