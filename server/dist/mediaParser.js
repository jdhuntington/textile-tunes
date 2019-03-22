"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FORMATS = ["mp3"];
class MediaParser {
    constructor(logger) {
        this.logger = logger;
    }
    grokable(file) {
        for (let x of FORMATS) {
            if (file.path.endsWith(`.${x}`)) {
                return true;
            }
        }
        return false;
    }
}
exports.MediaParser = MediaParser;
class MediaFile {
    constructor() {
        this.path = "";
    }
    static forPath(path) {
        const file = new MediaFile();
        file.path = path;
        return file;
    }
}
exports.MediaFile = MediaFile;
