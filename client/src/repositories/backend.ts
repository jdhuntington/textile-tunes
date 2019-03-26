import axios from "axios";
import { Track } from "../types";

export async function getAll(): Promise<Track[]> {
  const result = await axios.get("/api/everything");
  return (result.data as any[]).map(d => {
    const t: Track = {
      id: d.id,
      url: `/api/files/${d.id}`,
      artistName: d.path,
      trackName: d.path
    };
    return t;
  });
}
