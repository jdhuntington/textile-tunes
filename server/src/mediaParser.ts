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

  get backed() {
    return true;
  }

  static forPath(path: string): ConcreteMediaFile {
    const file = new ConcreteMediaFile();
    file.path = path;
    return file;
  }

  static fromRaw(obj: any): ConcreteMediaFile {
    const file = new ConcreteMediaFile();
    file.path = obj.path;
    file.id = obj.id;
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
