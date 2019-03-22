"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argparse_1 = __importDefault(require("argparse"));
const indexLibrary_1 = require("./actions/indexLibrary");
const logger_1 = require("./logger");
const context_1 = require("./repositories/context");
const mediaParser_1 = require("./mediaParser");
const parser = new argparse_1.default.ArgumentParser({
    version: "1",
    addHelp: true
});
const subParsers = parser.addSubparsers({
    title: "subcommands",
    dest: "subcommandName"
});
const parserIndex = subParsers.addParser("index", { addHelp: true });
parserIndex.addArgument("location", { help: "Source location to scan" });
const args = parser.parseArgs();
const logger = new logger_1.Logger();
const context = new context_1.Context();
if (args.subcommandName === "index") {
    const parser = new mediaParser_1.MediaParser(logger);
    const indexer = new indexLibrary_1.IndexLibrary(logger, parser, context.fileRepostitory);
    indexer.index(args.location);
}
