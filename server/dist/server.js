"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const argparse_1 = __importDefault(require("argparse"));
const tmp_1 = require("./controllers/tmp");
const parser = new argparse_1.default.ArgumentParser({
    version: "1",
    addHelp: true
});
parser.addArgument(["-p", "--port"], {
    help: "port",
    defaultValue: "6644"
});
const args = parser.parseArgs();
const app = express_1.default();
app.use("/tmp", tmp_1.routes);
const port = parseInt(args.port, 10);
const host = "0.0.0.0";
app.listen(port, host, () => {
    console.log(`Happily listening at ${host}:${port}`);
});
