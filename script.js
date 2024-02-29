let isPlaying = false;
let currentSongIndex = 0;
const audioElement = document.getElementById('myAudio');
const seekBar = document.querySelector('.seek-bar');
const coverArtElement = document.getElementById('coverArt');
const songQueue = [
  { src: "lavender haze.mp3", cover: 'midnights.jpg', title: "Lavender Haze" },
  { src: "maroon.mp3", cover: 'midnights.jpg', title: "Maroon" },
  { src: "anti hero.mp3", cover: 'midnights.jpg', title: "Anti Hero" },
  { src: "snow on the beach.mp3", cover: 'midnights.jpg', title: "Snow On The Beach (feat. Lana Del Rey)" },
  { src: "youre on your own kid.mp3", cover: 'midnights.jpg', title: "You're On Your Own Kid" },
  { src: "midnight rain.mp3", cover: 'midnights.jpg', title: "Midnight Rain" },
  { src: "question_.mp3", cover: 'midnights.jpg', title: "Question...?" },
  { src: "vigilante shit.mp3", cover: 'midnights.jpg', title: "Vigilante Shit" },
  { src: "bejeweled.mp3", cover: 'midnights.jpg', title: "Bejeweled" },
  { src: "labyrinth.mp3", cover: 'midnights.jpg', title: "Labyrinth" },
  { src: "karma.mp3", cover: 'midnights.jpg', title: "Karma" },
  { src: "sweet nothing.mp3", cover: 'midnights.jpg', title: "Sweet Nothing" },
  { src: "mastermind.mp3", cover: 'midnights.jpg', title: "Mastermind" },
  { src: "the great war.mp3", cover: 'midnights.jpg', title: "The Great War" },
  { src: "bigger than the whole sky.mp3", cover: 'midnights.jpg', title: "Bigger Than The Whole Sky" },
  { src: "paris.mp3", cover: 'midnights.jpg', title: "Paris" },
  { src: "high infidelity.mp3", cover: 'midnights.jpg', title: "High Infidelity" },
  { src: "glitch.mp3", cover: 'midnights.jpg', title: "Glitch" },
  { src: "wouldve couldve shouldve.mp3", cover: 'midnights.jpg', title: "Would've, Could've, Should've" },
  { src: "dear reader.mp3", cover: 'midnights.jpg', title: "Dear Reader" },
  { src: "hits different.mp3", cover: 'midnights.jpg', title: "Hits Different" },
  { src: "snow on the beach more lana del rey.mp3", cover: 'midnights.jpg', title: "Snow On The Beach (feat. More Lana Del Rey)" },
  { src: "karma ice spice.mp3", cover: 'midnights.jpg', title: "Karma (feat. Ice Spice)" },
  

] 
const playPauseButton = document.querySelector('.play-pause');

function togglePlayPause() {
  isPlaying = !isPlaying;

  if (isPlaying) {
    playPauseButton.textContent = 'Pause';
    audioElement.play();
  } else{
    playPauseButton.textContent = 'Play';
    audioElement.pause();
  }
}



audioElement.addEventListener('ended', playNext);

let isShuffleMode = false;
let shuffledQueue = [];

function toggleShuffleMode() {
  isShuffleMode = !isShuffleMode;

  if (isShuffleMode) {
    shuffledQueue = shuffleArray([...songQueue]);
    document.querySelector('.shuffle').textContent = 'Shuffle: On';
  } else {
    shuffledQueue = [];
    document.querySelector('.shuffle').textContent = 'Shuffle: Off';
  }

  updateQueue();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function playNext() {
  if (isShuffleMode) {
    if (shuffledQueue.length === 0) {
      shuffledQueue = shuffleArray([...songQueue]);
    }
    currentSongIndex = songQueue.indexOf(shuffledQueue.shift());
  } else {
    currentSongIndex = (currentSongIndex + 1) % songQueue.length;
  }

  // Update play/pause button text based on playback state
  const playPauseButton = document.querySelector('.play-pause');

  // Check if the audio is paused, update button text accordingly
  if (audioElement.paused) {
    playPauseButton.textContent = 'Play';
  } else {
    playPauseButton.textContent = 'Pause';
  }

  playCurrentSong();
}

function playPrevious() {
  currentSongIndex = (currentSongIndex - 1 + songQueue.length) % songQueue.length;
  playCurrentSong();
}

const currentSongTitleElement = document.getElementById('currentSongTitle');

function playCurrentSong() {
  const currentSong = songQueue[currentSongIndex];
  audioElement.src = currentSong.src;
  coverArtElement.src = currentSong.cover;
  currentSongTitleElement.textContent = currentSong.title; // Display the title
  audioElement.play();
  updateQueue();
}

function updateQueue() {
  const songQueueElement = document.getElementById('songQueue');
  songQueueElement.innerHTML = '';

  const displayQueue = isShuffleMode ? shuffledQueue : songQueue;

  displayQueue.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${song.title}`;
    if (isShuffleMode && currentSongIndex === songQueue.indexOf(song)) {
      listItem.classList.add('current-song-shuffle');
    } else if (!isShuffleMode && currentSongIndex === index) {
      listItem.classList.add('current-song');
    }
    songQueueElement.appendChild(listItem);
  });
}


function handleQueueItemClick(event) {
  console.log('Queue item clicked!');
  // ... (rest of the function)
}



// ... (rest of the code)



// ... (rest of the code)


function updateSeekBar(value) {
  const currentTimeElement = document.querySelector('.current-time');
  const duration = audioElement.duration;
  const currentTime = (value / 100) * duration;

  audioElement.currentTime = currentTime;
  currentTimeElement.textContent = formatTime(currentTime);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

audioElement.addEventListener('timeupdate', () => {
  const currentTimeElement = document.querySelector('.current-time');
  const duration = audioElement.duration;
  const currentTime = audioElement.currentTime;



  seekBar.value = (currentTime / duration) * 100;
  currentTimeElement.textContent = formatTime(currentTime);
});

// ... (previous JavaScript code)

const totalTimeElement = document.querySelector('.total-time');

audioElement.addEventListener('loadedmetadata', updateTotalTime);

function updateTotalTime() {
  const totalMinutes = Math.floor(audioElement.duration / 60);
  const totalSeconds = Math.floor(audioElement.duration % 60);
  totalTimeElement.textContent = `${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
}

// ... (rest of the JavaScript code)


// Optional: Auto-play the first song on page load
window.addEventListener('load', () => {
  playCurrentSong();
});

