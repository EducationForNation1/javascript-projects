const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTime1 = document.getElementById('current-time');
const duration1 = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn  = document.getElementById('prev');
const playBtn  = document.getElementById('play');
const nextBtn  = document.getElementById('next');



// Music

const songs = [
    {
        name:'music1',
        displayName:"Education For Nation",
        artist:"Deepak Kumar"
    },
    {
        name:'music2',
        displayName:"Education",
        artist:"Amit Kumar"
    },
    {
        name:'music3',
        displayName:"@educationfornation",
        artist:"AtulKumar"
    },
    {
        name:'music4',
        displayName:"My First Love",
        artist:"Manish Kumar"
    },
]

// Check if playing
let isPlaying = false;

// Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title','pause')
    music.play()
}

// Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title','play')
    music.pause()
}

// Play or Pause Event Listener
playBtn.addEventListener('click',()=>(isPlaying?pauseSong():playSong()));


// Update Dom
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src =`images/${song.name}.jpeg`;
}

// current Song
let songIndex = 0;

// Previous Song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}


// Next Song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// on Load - select first Song
loadSong(songs[songIndex])


// Update Progress bar & time
function updateProgressBase(e){
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;
        // update Progress bar width
        const progressPercent = (currentTime/duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // calculate display or duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        
        // Delay switching duration Element to avoid NaN
        if(durationSeconds){
         duration1.textContent = `${durationMinutes}:${durationSeconds}`;  
        }

        // Display or current Time
        const currentMinuets = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }

        currentTime1.textContent = `${currentMinuets}:${currentSeconds}`;
    }
}

// Set Progress bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width)*duration;
}


// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended',nextSong)
music.addEventListener('timeupdate',updateProgressBase);
progressContainer.addEventListener('click',setProgressBar);
