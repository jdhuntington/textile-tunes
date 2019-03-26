import * as React from "react";
import { Track } from "../../types";
import { Maybe } from "../../maybe";
import { DefaultButton } from "office-ui-fabric-react/lib/Button";

export interface PlayerProps {
  isPlaying: boolean;
  playPause: () => void;
  track: Maybe<Track>;
}

export const Player: React.FunctionComponent<PlayerProps> = props => {
  const label = props.isPlaying ? "Pause" : "Play";
  return (
    <div>
      <h1>{props.track.map(t => t.trackName).getOrElse("")}</h1>
      <DefaultButton onClick={props.playPause} text={label} />
    </div>
  );
};
