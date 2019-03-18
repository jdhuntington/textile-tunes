import { State, Track, TrackMap, PlaylistMap } from "./types";

const tracks: Track[] = [
  {
    trackName: "Overture",
    artistName: "The Neal Morse Band",
    albumName: "The Great Adventure - Act I",
    id: "001",
    duration: 606013,
    url: ""
  },
  {
    trackName: "The Dream Isn't Over",
    artistName: "The Neal Morse Band",
    albumName: "The Great Adventure - Act I",
    id: "002",
    duration: 160120,
    url: ""
  },
  {
    trackName: "Welcome to the World",
    artistName: "The Neal Morse Band",
    albumName: "The Great Adventure - Act I",
    id: "003",
    duration: 325386,
    url: ""
  },
  {
    trackName: "A Momentary Change",
    artistName: "The Neal Morse Band",
    albumName: "The Great Adventure - Act I",
    id: "004",
    duration: 221746,
    url: ""
  },
  {
    trackName: "Dark Melody",
    artistName: "The Neal Morse Band",
    albumName: "The Great Adventure - Act I",
    id: "005",
    duration: 209106,
    url: ""
  },
  {
    trackName: "I Got to Run",
    artistName: "The Neal Morse Band",
    albumName: "The Great Adventure - Act I",
    id: "006",
    duration: 365026,
    url: ""
  }
];

const trackMap: TrackMap = {};

tracks.forEach(t => {
  trackMap[t.id] = t;
});

const playlistMap: PlaylistMap = {
  "999": { trackIds: ["001", "002"], id: "999", name: "First two tracks" },
  "888": { trackIds: ["003", "004"], id: "888", name: "My Playlist" }
};

export const defaultState: State = {
  tracks: trackMap,
  playlists: playlistMap
};
