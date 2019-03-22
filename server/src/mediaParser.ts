import { Logger } from "./logger";

const FORMATS = ["mp3"];

export class MediaParser {
  constructor(private logger: Logger) {}

  grokable(file: MediaFile): boolean {
    for (let x of FORMATS) {
      if (file.path.endsWith(`.${x}`)) {
        return true;
      }
    }
    return false;
  }
}

export class MediaFile {
  public path: string = "";

  static forPath(path: string): MediaFile {
    const file = new MediaFile();
    file.path = path;
    return file;
  }
}
