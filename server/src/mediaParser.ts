import * as mm from "music-metadata";
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

export interface MediaFile {
  backed: boolean;
  path: string;
  id: string;
}

export class ConcreteMediaFile implements MediaFile {
  public path: string = "";
  public id: string = "";
  album: string | undefined;
  artist: string | undefined;
  title: string | undefined;

  get backed() {
    return true;
  }

  static async forPath(path: string): Promise<ConcreteMediaFile> {
    const file = new ConcreteMediaFile();
    file.path = path;
    return file;
  }

  async loadMetadata(): Promise<void> {
    const metadata = await mm.parseFile(this.path);
    this.album = metadata.common.album;
    this.artist = metadata.common.artist;
    this.title = metadata.common.title;
  }

  static fromRaw(obj: any): ConcreteMediaFile {
    const file = new ConcreteMediaFile();
    file.path = obj.path;
    file.id = obj.id;
    file.album = obj.album;
    file.artist = obj.artist;
    file.title = obj.title;
    return file;
  }
}

export class MissingMediaFile implements MediaFile {
  public path: string = "";
  public id: string = "";

  get backed() {
    return false;
  }

  static instance(): MissingMediaFile {
    return new MissingMediaFile();
  }
}
