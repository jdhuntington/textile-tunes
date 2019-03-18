export interface Track {
  trackName?: string;
  albumName?: string;
  artistName?: string;
  id: string;
  duration: number;
  url: string;
}

export interface Playlist {
  trackIds: string[];
  id: string;
  name: string;
}

export type TrackMap = { [id: string]: Track };
export type PlaylistMap = { [id: string]: Playlist };

export interface State {
  tracks: TrackMap;
  playlists: PlaylistMap;
}
