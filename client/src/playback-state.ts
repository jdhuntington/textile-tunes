import { Maybe } from "./maybe";

export class PlaybackState {
  constructor(
    public currentPos: Maybe<number>,
    public duration: Maybe<number>,
    public playing: boolean
  ) {}

  static empty(): PlaybackState {
    return new PlaybackState(Maybe.none(), Maybe.none(), false);
  }
}
