"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var argparse_1 = __importDefault(require("argparse"));
var tmp_1 = require("./controllers/tmp");
var parser = new argparse_1.default.ArgumentParser({
    version: "1",
    addHelp: true
});
parser.addArgument(["-p", "--port"], {
    help: "port",
    defaultValue: "6644"
});
var args = parser.parseArgs();
var app = express_1.default();
app.use("/tmp", tmp_1.routes);
var port = parseInt(args.port, 10);
var host = "0.0.0.0";
app.listen(port, host, function () {
    console.log("Happily listening at " + host + ":" + port);
});
