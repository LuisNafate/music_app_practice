import getRandom from "./utils.js"

export default function createPlaylist(data, actual_playlist){

    let playlist = [];

    if(actual_playlist !== null){
        playlist = actual_playlist;
    }

    if(data.length !== 0){

        let index_song = getRandom(data.length);
        playlist.push(data[index_song]);
        data.splice(index_song, 1);

        return createPlaylist(data, playlist);

    }

    return playlist;
}