document.addEventListener('DOMContentLoaded', function () {
  const playlist = document.getElementById('playlist');
  const songTitle = document.getElementById('song_title');
  const artist = document.getElementById('artist');
  const audioPlayer = new Audio();
  let currentSongIndex = 0;

  // Function to play song
  function playSong(songIndex) {
      const selectedSong = playlist.children[songIndex];
      const songSrc = selectedSong.getAttribute('data-src');
      const songDetails = selectedSong.textContent.split(' - ');

      // Set audio source
      audioPlayer.src = songSrc;

      // Set song details
      songTitle.textContent = songDetails[1];
      artist.textContent = songDetails[0];

      // Remove 'selected' class from all list items
      Array.from(playlist.children).forEach(item => item.classList.remove('selected'));

      // Add 'selected' class to the selected song
      selectedSong.classList.add('selected');

      // Play audio
      audioPlayer.play();
  }

  // Initial song play
  playSong(currentSongIndex);

  // Function to pause song
  function pauseSong() {
      if (!audioPlayer.paused) {
          audioPlayer.pause();
      } else {
          audioPlayer.play();
      }
  }

  // Event listener for play/pause button
  document.getElementById('play_or_stop_selected_song').addEventListener('click', pauseSong);

  // Function to play next song
  function nextSong() {
      currentSongIndex++;
      if (currentSongIndex >= playlist.children.length) {
          currentSongIndex = 0;
      }
      playSong(currentSongIndex);
  }

  // Event listener for next song button
  document.getElementById('next_song').addEventListener('click', nextSong);

  // Function to play previous song
  function previousSong() {
      currentSongIndex--;
      if (currentSongIndex < 0) {
          currentSongIndex = playlist.children.length - 1;
      }
      playSong(currentSongIndex);
  }

  // Event listener for previous song button
  document.getElementById('previous_song').addEventListener('click', previousSong);

  // Event listener for playlist items
  playlist.addEventListener('click', function (event) {
      if (event.target.tagName === 'LI') {
          currentSongIndex = Array.from(playlist.children).indexOf(event.target);
          playSong(currentSongIndex);
      }
  });

  // Function to filter playlist based on search input
  document.getElementById('search_music').addEventListener('input', function (event) {
      const searchTerm = event.target.value.toLowerCase();
      Array.from(playlist.children).forEach((item, index) => {
          const songDetails = item.textContent.toLowerCase();
          if (songDetails.includes(searchTerm)) {
              item.style.display = 'block';
          } else {
              item.style.display = 'none';
              if (index === currentSongIndex) {
                  currentSongIndex = -1; // Reset current song index if filtered song is currently playing
              }
          }
      });
  });
});