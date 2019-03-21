"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var argparse_1 = __importDefault(require("argparse"));
var indexLibrary_1 = require("./actions/indexLibrary");
var logger_1 = require("./logger");
var parser = new argparse_1.default.ArgumentParser({
    version: "1",
    addHelp: true
});
var subParsers = parser.addSubparsers({
    title: "subcommands",
    dest: "subcommandName"
});
var parserIndex = subParsers.addParser("index", { addHelp: true });
parserIndex.addArgument("location", { help: "Source location to scan" });
var args = parser.parseArgs();
var logger = new logger_1.Logger();
if (args.subcommandName === "index") {
    var indexer = new indexLibrary_1.IndexLibrary(logger);
    indexer.index(args.location);
}
