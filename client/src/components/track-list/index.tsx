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
    key: "nowPlaying",
    name: " ",
    fieldName: "isPlaying",
    minWidth: 30,
    maxWidth: 50,
    isResizable: false
  },
  {
    key: "trackName",
    name: "Title",
    fieldName: "trackName",
    minWidth: 100,
    maxWidth: 200,
    isResizable: true
  },
  {
    key: "albumName",
    name: "Album",
    fieldName: "albumName",
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
  const selectionRef = React.useRef(new Selection());

  return (
    <DetailsList
      onItemInvoked={a => props.onPlay(a.id)}
      items={props.tracks}
      columns={columns}
      selection={selectionRef.current}
      onRenderItemColumn={(item, index, column) => {
        return <div>I suck</div>;
      }}
    />
  );
};
