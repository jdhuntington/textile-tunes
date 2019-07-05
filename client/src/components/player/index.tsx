import * as React from "react";
import { Track } from "../../types";
import { Maybe } from "../../maybe";
import {
  DefaultButton,
  PrimaryButton
} from "office-ui-fabric-react/lib/Button";
import { ThemeProvider } from "@uifabric/foundation";

export interface PlayerProps {
  isPlaying: boolean;
  playPause: () => void;
  track: Maybe<Track>;
}

export const Player: React.FunctionComponent<PlayerProps> = props => {
  const button = props.isPlaying ? (
    <DefaultButton
      iconProps={{ iconName: "Pause" }}
      onClick={props.playPause}
      text="Pause"
    />
  ) : (
    <DefaultButton
      iconProps={{ iconName: "Play" }}
      onClick={props.playPause}
      text="Play"
    />
  );

  return (
    <ThemeProvider scheme="strong">
      <h1>{props.track.map(t => t.trackName).getOrElse("")}</h1>
      {button}
    </ThemeProvider>
  );
};
