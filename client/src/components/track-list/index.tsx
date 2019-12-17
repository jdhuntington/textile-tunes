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
  console.log(props.playingTrack);
  // Next steps: Transform tracklist into new setof objects.
  return (
    <DetailsList
      onItemInvoked={a => props.onPlay(a.id)}
      items={props.tracks}
      columns={columns}
      key={props.playingTrack.map(x => x.id).getOrElse("nothing")}
      selection={selectionRef.current}
      onRenderItemColumn={(item, index, column) => {
        if (column && column.fieldName && column.fieldName === "isPlaying") {
          console.log("in isPlaying check", props.playingTrack);
          if (
            props.playingTrack &&
            (props.playingTrack as any).getOrElse({ id: undefined }).id ===
              item.id
          ) {
            return <Icon iconName="Play" />;
          } else {
            return null;
          }
        }
        if (column && column.fieldName) {
          return <span>{item[column.fieldName]}</span>;
        }
        return null;
      }}
    />
  );
};
