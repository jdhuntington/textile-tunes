"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileRepository_1 = require("./fileRepository");
class Context {
    constructor() {
        this.fileRepostitory = new fileRepository_1.JsonFileRepository();
    }
}
exports.Context = Context;
