import * as React from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Selection,
  SelectionMode
} from "office-ui-fabric-react/lib/DetailsList";
import { Track } from "../../types";

interface TrackListProps {
  tracks: Track[];
  playingTrack: string | undefined;
  onPlay: (trackId: string) => void;
}

const columns = [
  {
    key: "trackName",
    name: "Name",
    fieldName: "trackName",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  },
  {
    key: "artistName",
    name: "Artist",
    fieldName: "artistName",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  }
];

export const TrackList: React.FunctionComponent<TrackListProps> = props => {
  return (
    <DetailsList
      selectionMode={SelectionMode.none}
      onItemInvoked={a => props.onPlay(a.id)}
      items={props.tracks}
      columns={columns}
    />
  );
};
