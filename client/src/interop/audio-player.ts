interface AudioPlayerState {
  isPlaying: boolean;
  source: string | undefined;
  duration: number | undefined;
  currentPos: number | undefined;
}
type AudioPlayerCallback = (state: AudioPlayerState) => void;

export class AudioPlayer {
  private source: string | undefined;
  private element: HTMLAudioElement | undefined = undefined;
  private callbacks: AudioPlayerCallback[] = [];

  registerCallback(callback: AudioPlayerCallback): void {
    this.callbacks.push(callback);
  }

  attach(): void {
    if (!this.element) {
      this.element = document.createElement("audio");

      this.element.addEventListener("canplaythrough", this.handleElementEvent);
      this.element.addEventListener("timeupdate", this.handleElementEvent);
      this.element.addEventListener("play", this.handleElementEvent);
      this.element.addEventListener("pause", this.handleElementEvent);
      this.element.addEventListener("durationchange", this.handleElementEvent);
    }
  }

  play(): void {
    if (this.source && this.element) {
      console.log("Trying to play");
      this.element.play();
    }
  }

  pause(): void {
    if (this.source && this.element) {
      this.element.pause();
    }
  }

  load(source: string): void {
    if (this.element) {
      this.element.pause();
      this.source = source;
      this.element.setAttribute("src", source);
    }
  }

  triggerObservers(state: AudioPlayerState): void {
    for (let i = 0; i < this.callbacks.length; i++) {
      this.callbacks[i](state);
    }
  }

  private handleElementEvent = (a: any) => {
    console.log({ a });
    if (this.element) {
      this.triggerObservers({
        isPlaying: !this.element.paused,
        currentPos: this.element.currentTime,
        duration: this.element.duration,
        source: this.source
      });
    }
  };
}
