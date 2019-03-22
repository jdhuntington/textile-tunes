import { Logger } from "../logger";
import glob from "glob";
import util from "util";
import path from "path";
import fs from "fs";
import { MediaParser, MediaFile } from "../mediaParser";
import { FileRepository } from "../repositories/fileRepository";

const globAsync = util.promisify(glob);
const existsAsync = util.promisify(fs.exists);

export class IndexLibrary {
  constructor(
    private logger: Logger,
    private parser: MediaParser,
    private repo: FileRepository
  ) {}

  async addFiles(files: string[]): Promise<void> {
    for (let i = 0; i < files.length; i++) {
      const x = files[i];

      if (!x) {
        continue;
      }
      const file = MediaFile.forPath(x);
      if (!this.parser.grokable(file)) {
        continue;
      }
      if (await this.repo.hasFile(file)) {
        continue;
      }
      this.logger.log(`Adding '${JSON.stringify(file)}`);
      await this.repo.addFile(file);
    }
  }

  async index(location: string): Promise<void> {
    const exists = await existsAsync(location);
    if (!exists) {
      this.logger.error(`Cannot find "${location}"`);
      throw new Error(`"${location} does not exist!`);
    }
    this.logger.log("globbing...");
    const files = await globAsync(path.join(location, "**", "*"));
    this.logger.log("adding files...");
    await this.addFiles(files);
    this.logger.log("persisting...");
    await this.repo.persist();
  }
}
