import createPlaylist from "./utils/playlist.js";

// --- Nuevos selectores ---
const media = document.getElementById("media");
const play_btn_container = document.getElementById("play"); // Contenedor del ícono
const play_btn_icon = play_btn_container.querySelector("i"); // El ícono en sí
const forward_btn = document.getElementById("forward");
const lastest_btn = document.getElementById("lastest");

// Selectores de información de la canción
const song_img_main = document.getElementById("song-img");
const title_main = document.getElementById("title");
const artist_main = document.getElementById("artist");

// Selectores de la barra del reproductor
const song_img_bar = document.getElementById("player-bar-img");
const title_bar = document.getElementById("player-bar-title");
const artist_bar = document.getElementById("player-bar-artist");
const progress_bar = document.getElementById("progress");

const songs = [
    {
        song_name: "Canción Electrónica",
        artist_name: "Artista 1",
        song_url: "./media/song.mp3",
        caratula: "https://picsum.photos/id/237/300"
    },
    {
        song_name: "Bebe Dame",
        artist_name: "Fuerza Regida & Grupo Frontera",
        song_url: "./media/song_2.mp3",
        caratula: "https://picsum.photos/id/238/300"
    },
    {
        song_name: "Minero",
        artist_name: "ElBokeron",
        song_url: "./media/song_3.mp3",
        caratula: "https://picsum.photos/id/239/300"
    },
];

const last = [];
const playlist = createPlaylist(songs.length);
let playingNow;

window.addEventListener('DOMContentLoaded', () => {
    playingNow = playlist.pop();
    loadSong(playingNow);
});

// --- Función loadSong actualizada ---
function loadSong(songIndex) {
    const now = songs[songIndex];

    // Cargar en la vista principal
    title_main.innerText = now.song_name;
    artist_main.innerText = now.artist_name;
    song_img_main.src = now.caratula;

    // Cargar en la barra del reproductor
    title_bar.innerText = now.song_name;
    artist_bar.innerText = now.artist_name;
    song_img_bar.src = now.caratula;
    
    // Cargar el audio
    media.src = now.song_url;
}

media.addEventListener('loadedmetadata', () => {
    progress_bar.max = media.duration;
    progress_bar.value = 0;
    // Si la canción se carga y el botón está en modo "pausa", dale play
    if(play_btn_container.classList.contains("playing")){
        media.play();
    }
});

media.ontimeupdate = function() {
    progress_bar.value = this.currentTime;
}

progress_bar.oninput = function() {
    media.currentTime = this.value;
}

lastest_btn.addEventListener('click', function() {
    if (last.length > 0) {
        playlist.push(playingNow);
        playingNow = last.pop();
        loadSong(playingNow);
        // Si estaba sonando, que siga sonando la nueva canción
        if (play_btn_container.classList.contains('playing')) {
            media.play();
        }
    }
});

forward_btn.addEventListener('click', function() {
    if (playlist.length > 0) {
        last.push(playingNow);
        playingNow = playlist.pop();
        loadSong(playingNow);
        // Si estaba sonando, que siga sonando la nueva canción
        if (play_btn_container.classList.contains('playing')) {
            media.play();
        }
    }
});

// --- Función playPause actualizada ---
function playPause() {
    if (media.paused) {
        media.play();
        play_btn_icon.classList.remove("fa-play");
        play_btn_icon.classList.add("fa-pause");
        play_btn_container.classList.add("playing");
    } else {
        media.pause();
        play_btn_icon.classList.remove("fa-pause");
        play_btn_icon.classList.add("fa-play");
        play_btn_container.classList.remove("playing");
    }
}

play_btn_container.addEventListener("click", playPause);