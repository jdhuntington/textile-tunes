import express from "express";
import argparse from "argparse";
import { routes as tmpRoutes } from "./controllers/tmp";

interface ServerArgs {
  port: string;
}
const parser = new argparse.ArgumentParser({
  version: "1",
  addHelp: true
});
parser.addArgument(["-p", "--port"], {
  help: "port",
  defaultValue: "6644"
});

const args: ServerArgs = parser.parseArgs();

const app = express();
app.use("/tmp", tmpRoutes);

const port = parseInt(args.port, 10);
const host = "0.0.0.0";
app.listen(port, host, () => {
  console.log(`Happily listening at ${host}:${port}`);
});
