import fs from "fs";
import os from "os";
import path from "path";
import { MediaFile, MissingMediaFile, ConcreteMediaFile } from "../mediaParser";
import { promisify } from "util";
import crypto from "crypto";

function hash(input: string): string {
  return crypto
    .createHash("sha1")
    .update(input)
    .digest("hex");
}

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const existsAsync = promisify(fs.exists);

export interface FileRepository {
  find(fileId: string): Promise<MediaFile>;
  persist(): Promise<void>;
  addFile(file: MediaFile): Promise<void>;
  hasFile(file: MediaFile): Promise<boolean>;
  allFiles(): Promise<MediaFile[]>;
}

export class InMemoryFileRepository implements FileRepository {
  private files: { [path: string]: MediaFile } = {};

  async addFile(file: MediaFile): Promise<void> {
    this.files[file.path] = file;
  }

  allFiles(): Promise<MediaFile[]> {
    return Promise.resolve(Object.values(this.files));
  }

  async hasFile(file: MediaFile): Promise<boolean> {
    return !!this.files[file.path];
  }

  async persist(): Promise<void> {
    // nop;
  }

  find(fileId: string): Promise<MediaFile> {
    throw new Error("Method not implemented.");
  }
}

const defaultJsonPath = (): string => {
  return path.join(os.homedir(), ".textile-tunes.json");
};

export class JsonFileRepository implements FileRepository {
  private loaded = false;
  private files: { [path: string]: MediaFile } = {};

  constructor(public path: string = defaultJsonPath()) {}

  async allFiles(): Promise<MediaFile[]> {
    await this.load();
    return Object.values(this.files);
  }

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
    file.id = hash(file.path);
    this.files[file.id] = file;
  }

  async hasFile(file: MediaFile): Promise<boolean> {
    await this.load();
    return !!this.files[file.path];
  }

  async find(fileId: string): Promise<MediaFile> {
    await this.load();
    return this.files[fileId] || MissingMediaFile.instance();
  }

  async load(): Promise<void> {
    if (this.loaded) {
      return;
    }
    if (await existsAsync(this.path)) {
      const contents = await readFileAsync(this.path, "utf8");
      const jsonContents = JSON.parse(contents);
      this.files = {};
      for (let key in jsonContents) {
        const val = ConcreteMediaFile.fromRaw(jsonContents[key]);
        this.files[key] = val;
      }
    }
    this.loaded = true;
  }
}
