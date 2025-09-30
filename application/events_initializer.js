import * as elements from "./application/html_elements.js";
import player from "../domain/player.js";
import songs from "../ports/multimedia.js"

export default function () {
    window.addEventListener('DOMContentLoaded', () => {
        player.initializePlayer();
        const playingNow = songs[player._actualSong];
    });

    elements.lastest.addEventListener('click', function(){
        if(!last.length == 0){
            playlist.push(playingNow);
            playingNow = last.pop();
            loadSong(playingNow)
        }
    });
    elements.forward.addEventListener('click', function(){
        if(!playlist.length == 0){
            last.push(playingNow);
            playingNow = playlist.pop();
            loadSong(playingNow)
        }
    });

    elements.play_btn.addEventListener("click", playPause);
}