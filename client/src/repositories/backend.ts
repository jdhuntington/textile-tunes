import axios from "axios";
import { Track, Playlist } from "../types";

export async function getAll(): Promise<Track[]> {
  const result = await axios.get("/api/everything");
  return (result.data as any[]).map(d => {
    const t: Track = {
      id: d.id,
      url: `/api/files/${d.id}`,
      artistName: d.artist,
      trackName: d.title,
      albumName: d.album
    };
    return t;
  });
}

export async function createPlaylist(): Promise<Playlist> {
  const result = await axios.post("/api/playlist");
  return result.data as Playlist;
}
