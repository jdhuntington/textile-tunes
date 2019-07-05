import * as Backend from "./repositories/backend";
import React, { useEffect, useState } from "react";
import { AudioPlayer } from "./interop/audio-player";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Fabric } from "./components/wrapper/fabric";
import { Header } from "./components/header";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { Maybe } from "./maybe";
import { Player } from "./components/player";
import { Playlist, Track } from "./types";
import { Sidebar } from "./components/sidebar";
import { TrackList } from "./components/track-list";
import "./App.css";

initializeIcons();

let keyIndex = 555;
const player = new AudioPlayer();

export const App: React.FunctionComponent = props => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Maybe<Track>>(Maybe.none());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [navKey, setNavKey] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const results = await Backend.getAll();
      setTracks(results);
    };
    fetch();
  }, []);

  useEffect(() => {
    player.attach();
    player.registerCallback(audioPlayerState => {
      console.log({ audioPlayerState });
      setIsPlaying(audioPlayerState.isPlaying);
    });
  }, []);

  const createPlaylist = () => {
    const list: Playlist = {
      trackIds: [],
      name: "Untitled",
      id: `playlist-${keyIndex++}`
    };
    /* const newPlaylists = { ...myState.playlists, [list.id]: list };
    const newState = { ...myState, playlists: newPlaylists };
    setMyState(newState); */
    setNavKey(list.id);
  };

  const playTrack = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (track) {
      player.load(track.url);
      player.play();
    } else {
      console.error(`Cannot find track ${trackId}!`);
    }
  };

  const playPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  return (
    <Fabric>
      <Router>
        <div className="main-app">
          <div className="player">
            <Player
              isPlaying={isPlaying}
              playPause={playPause}
              track={nowPlaying}
            />
          </div>

          <div className="sidebar">
            <Header />
            <Sidebar
              selectedView={navKey}
              navigate={(key: string) => setNavKey(key)}
              createPlaylist={() => createPlaylist()}
              playlists={{}}
            />
          </div>
          <div className="main">
            <TrackList
              onPlay={playTrack}
              playingTrack={undefined}
              tracks={tracks}
            />
          </div>
        </div>
      </Router>
    </Fabric>
  );
};
