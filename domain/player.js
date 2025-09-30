import audioController from "../domain/audio_controller.js";
import createPlaylist from "../utils/playlist.js";
import playerInterface from "./player_interface.js";

const player = {
    _last: document.getElementById("lastest"),
    _next: document.getElementById("forward"),
    _play: document.getElementById("play"),
    _controller: audioController,
    _interface: playerInterface,
    initializePlayer(songs) {
        this._controller.initializePlayer(

            createPlaylist(songs, null)

        );
        this._interface.loadSong(this._controller._actualSong);
        this._last.addEventListener('click', function(){
            player._controller.nextSong();
            console.log(player._controller._actualSong)
            player._interface.loadSong(player._controller._actualSong);
        });
        this._next.addEventListener('click', this._controller.nextSong);
        this._play.addEventListener('click', this._controller.playPause);
    }

}

export default player;