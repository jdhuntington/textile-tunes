import * as React from "react";
import { PlaybackState } from "../../playback-state";
import { Track } from "../../types";
import { Maybe } from "../../maybe";
import { DefaultButton, ProgressIndicator } from "office-ui-fabric-react";
import { ThemeProvider } from "@uifabric/foundation";

export interface PlayerProps {
  playbackState: PlaybackState;
  playPause: () => void;
  track: Maybe<Track>;
}

export const Player: React.FunctionComponent<PlayerProps> = props => {
  const button = props.playbackState.playing ? (
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

  const percentComplete = props.playbackState.duration
    .map(d => props.playbackState.currentPos.map(cp => cp / d).getOrElse(0))
    .getOrElse(0);

  return (
    <ThemeProvider scheme="strong">
      <h1>{props.track.map(t => t.trackName).getOrElse("")}</h1>
      {button}
      <ProgressIndicator percentComplete={percentComplete} />
    </ThemeProvider>
  );
};
