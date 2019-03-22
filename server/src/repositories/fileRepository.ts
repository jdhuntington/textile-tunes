import { MediaFile } from "../mediaParser";
import path from "path";
import os from "os";
import fs from "fs";
import { promisify } from "util";

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const existsAsync = promisify(fs.exists);

export interface FileRepository {
  persist(): Promise<void>;
  addFile(file: MediaFile): Promise<void>;
  hasFile(file: MediaFile): Promise<boolean>;
}

export class InMemoryFileRepository implements FileRepository {
  private files: { [path: string]: MediaFile } = {};

  async addFile(file: MediaFile): Promise<void> {
    this.files[file.path] = file;
  }

  async hasFile(file: MediaFile): Promise<boolean> {
    return !!this.files[file.path];
  }

  async persist(): Promise<void> {
    // nop;
  }
}

const defaultJsonPath = (): string => {
  return path.join(os.homedir(), ".textile-tunes.json");
};

export class JsonFileRepository implements FileRepository {
  private loaded = false;
  private files: { [path: string]: MediaFile } = {};

  constructor(public path: string = defaultJsonPath()) {}

  async persist(): Promise<void> {
    if (this.loaded) {
      await writeFileAsync(
        this.path,
        JSON.stringify(this.files, null, 2),
        "utf8"
      );
    }
  }

  async addFile(file: MediaFile): Promise<void> {
    await this.load();
    this.files[file.path] = file;
  }

  async hasFile(file: MediaFile): Promise<boolean> {
    await this.load();
    return !!this.files[file.path];
  }

  async load(): Promise<void> {
    if (this.loaded) {
      return;
    }
    if (await existsAsync(this.path)) {
      const contents = await readFileAsync(this.path, "utf8");
      this.files = JSON.parse(contents);
    }
    this.loaded = true;
  }
}
