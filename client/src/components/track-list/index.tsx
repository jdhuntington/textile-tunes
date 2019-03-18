import * as React from "react";
import { Track } from "../../state/types";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";

interface TrackListProps {
  tracks: Track[];
  playingTrack: string | undefined;
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
  return <DetailsList items={props.tracks} columns={columns} />;
};
