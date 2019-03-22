"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const writeFileAsync = util_1.promisify(fs_1.default.writeFile);
const readFileAsync = util_1.promisify(fs_1.default.readFile);
const existsAsync = util_1.promisify(fs_1.default.exists);
class InMemoryFileRepository {
    constructor() {
        this.files = {};
    }
    async addFile(file) {
        this.files[file.path] = file;
    }
    async hasFile(file) {
        return !!this.files[file.path];
    }
    async persist() {
        // nop;
    }
}
exports.InMemoryFileRepository = InMemoryFileRepository;
const defaultJsonPath = () => {
    return path_1.default.join(os_1.default.homedir(), ".textile-tunes.json");
};
class JsonFileRepository {
    constructor(path = defaultJsonPath()) {
        this.path = path;
        this.loaded = false;
        this.files = {};
    }
    async persist() {
        if (this.loaded) {
            await writeFileAsync(this.path, JSON.stringify(this.files, null, 2), "utf8");
        }
    }
    async addFile(file) {
        await this.load();
        this.files[file.path] = file;
    }
    async hasFile(file) {
        await this.load();
        return !!this.files[file.path];
    }
    async load() {
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
exports.JsonFileRepository = JsonFileRepository;
