const image = document.querySelector("#cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const background = document.getElementById("background");
const random=document.querySelector("#random")
const repeat=document.querySelector("#repeat")
const volumeSlider=document.querySelector(".volume-slider")
// Music
const songs = [
  {
    path:
      "http://ssd.sazoseda.ir/1400/09/25/yas%20-%20band%20naf%20ta%20khate%20saaf%20[128].mp3",
    displayName: "Bande Naaf Ta Khatte Saaf",
    artist: "Yas",
    cover:
      "images/1.jfif",
  },
  {
    path: "http://ssd.sazoseda.ir/1400/06/06/Yas%20-%20Be%20Khatere%20Man%20[128].mp3",
    displayName: "Boghz Yani",
    artist: "Yas",
    cover: "images/2.jfif",
  },
  {
    path:
      "http://ssd.sazoseda.ir/1400/09/26/yas%20%20-%20vasiyat%20name%20[128].mp3",
    displayName: "Vasiat Nameh",
    artist: "Yas",
    cover:
      "images/3.jfif",
  },
  {
    path:
      "http://ssd.sazoseda.ir/1400/09/24/yas%20%20-%20faryas%20[128].mp3",
    displayName: "Faryas",
    artist: "Yas",
    cover:
      "images/4.jfif",
  },
];




let isRandom=false
random.addEventListener("click",()=>{
   isRandom? pauseRandom():playRandom();
})
const playRandom=()=>{
  isRandom=true
  random.classList.add("randomactive")
}
const pauseRandom=()=>{
  isRandom=false
  random.classList.remove("randomactive")
}

repeat.addEventListener("click",()=>{
  repeat.classList.toggle("repeatactive")
  let currentIndex=songIndex
  loadSong(songs[currentIndex]);
  playSong()
  
  
})

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  image.classList.add("rotate")
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  image.classList.remove("rotate")

  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", function () {
  isPlaying? pauseSong():playSong()
})

// Update DOM
function loadSong(song) {
  console.log(song);
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = song.path;
  changeCover(song.cover);
}

function changeCover(cover) {
  console.log(cover)
  image.classList.remove("active");
  setTimeout(() => {
    image.src = cover;
    image.classList.add("active");
  }, 100);
  background.src = cover;
}

// Current Song
let songIndex = 0;

const prevSong=()=>{
  if(songIndex>0){
    songIndex--
  }else{
    songIndex=songs.length -1
  }
  loadSong(songs[songIndex])
  playSong()
}

// Next Song
const nextSong=()=>{
  if(songIndex<songs.length -1 && isRandom===false){
    songIndex++
  }else if(songIndex<songs.length -1 && isRandom===true){
    let randomIndex= Number.parseInt(Math.random()*songs.length)
    songIndex=randomIndex
  }else{
    songIndex=0
  }
  loadSong(songs[songIndex])
  playSong()
}


const setVolume=()=>{
  music.volume=volumeSlider.value /100
}


// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const duration = e.srcElement.duration;
    const currentTime = e.srcElement.currentTime;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + "%";
    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    // Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = durationMinutes + ":" + durationSeconds;
    }
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = currentMinutes + ":" + currentSeconds;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = music.duration;
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
