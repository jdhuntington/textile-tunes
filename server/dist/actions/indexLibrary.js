"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = __importDefault(require("glob"));
const util_1 = __importDefault(require("util"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mediaParser_1 = require("../mediaParser");
const globAsync = util_1.default.promisify(glob_1.default);
const existsAsync = util_1.default.promisify(fs_1.default.exists);
class IndexLibrary {
    constructor(logger, parser, repo) {
        this.logger = logger;
        this.parser = parser;
        this.repo = repo;
    }
    async addFiles(files) {
        for (let i = 0; i < files.length; i++) {
            const x = files[i];
            if (!x) {
                continue;
            }
            const file = mediaParser_1.MediaFile.forPath(x);
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
    async index(location) {
        const exists = await existsAsync(location);
        if (!exists) {
            this.logger.error(`Cannot find "${location}"`);
            throw new Error(`"${location} does not exist!`);
        }
        this.logger.log("globbing...");
        const files = await globAsync(path_1.default.join(location, "**", "*"));
        this.logger.log("adding files...");
        await this.addFiles(files);
        this.logger.log("persisting...");
        await this.repo.persist();
    }
}
exports.IndexLibrary = IndexLibrary;
