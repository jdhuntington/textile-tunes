import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { defaultState } from "./state/default";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { Header } from "./components/header";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { Playlist, State, Track } from "./state/types";
import { Sidebar } from "./components/sidebar";
import { TrackList } from "./components/track-list";
import "./App.css";

initializeIcons();

const getTracks = (state: State, navKey: string): Track[] => {
  const playlist: Playlist = state.playlists[navKey];
  if (!playlist) {
    return [];
  }
  return playlist.trackIds.map(trackId => state.tracks[trackId]);
};

let keyIndex = 555;

export const App: React.FunctionComponent = props => {
  const [myState, setMyState] = useState(defaultState);
  const [navKey, setNavKey] = useState("");

  const createPlaylist = () => {
    const list: Playlist = {
      trackIds: [],
      name: "Untitled",
      id: `playlist-${keyIndex++}`
    };
    const newPlaylists = { ...myState.playlists, [list.id]: list };
    const newState = { ...myState, playlists: newPlaylists };
    setMyState(newState);
    setNavKey(list.id);
  };

  return (
    <Fabric>
      <Router>
        <div className="main-app">
          <div className="player">
            <em>player</em>
          </div>

          <div className="sidebar">
            <Header />
            <Sidebar
              selectedView={navKey}
              navigate={(key: string) => setNavKey(key)}
              createPlaylist={() => createPlaylist()}
              playlists={myState.playlists}
            />
          </div>
          <div className="main">
            <TrackList
              playingTrack={undefined}
              tracks={getTracks(myState, navKey)}
            />
          </div>
        </div>
      </Router>
    </Fabric>
  );
};
