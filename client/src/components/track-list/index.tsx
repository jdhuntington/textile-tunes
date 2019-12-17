import * as React from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Selection,
  SelectionMode
} from "office-ui-fabric-react/lib/DetailsList";
import { Track } from "../../types";
import { Icon } from "office-ui-fabric-react";
import { Maybe } from "../../maybe";

interface TrackListProps {
  tracks: Track[];
  playingTrack: Maybe<Track>;
  onPlay: (trackId: string) => void;
}

const columns: IColumn[] = [
  {
    key: "nowPlaying",
    name: " ",
    fieldName: "isPlaying",
    minWidth: 30,
    maxWidth: 50,
    isResizable: false,
    onRender: (item: any) => (item.isPlaying ? <Icon iconName="Play" /> : null)
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
  console.log(props.playingTrack);
  // Next steps: Transform tracklist into new setof objects.

  const tracks = props.tracks.map(t => {
    return {
      ...t,
      isPlaying: props.playingTrack
        .map(playing => playing.id === t.id)
        .getOrElse(false)
    };
  });

  return (
    <DetailsList
      onItemInvoked={a => props.onPlay(a.id)}
      items={tracks}
      columns={columns}
      selection={selectionRef.current}
    />
  );
};
