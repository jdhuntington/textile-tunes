import { Logger } from "../logger";
import glob from "glob";
import util from "util";
import path from "path";
import fs from "fs";

const globAsync = util.promisify(glob);
const existsAsync = util.promisify(fs.exists);

export class IndexLibrary {
  constructor(private logger: Logger) {}

  async index(location: string): Promise<void> {
    const exists = await existsAsync(location);
    if (!exists) {
      this.logger.error(`Cannot find "${location}"`);
      throw new Error(`"${location} does not exist!`);
    }

    const files = await globAsync(path.join(location, "**", "*"));
    for (const x in files) {
      this.logger.log(`TODO add ${x}`);
    }
  }
}
