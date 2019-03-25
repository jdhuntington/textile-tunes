import argparse from "argparse";
import { Context } from "./repositories/context";
import { IndexLibrary } from "./actions/indexLibrary";
import { Logger } from "./logger";
import { MediaParser } from "./mediaParser";
import { serve } from "./server";

interface BaseArgs {
  subcommandName: string;
}

interface IndexArgs extends BaseArgs {
  location: string;
}

interface ServerArgs extends BaseArgs {
  port: string;
  host: string;
}

const parser = new argparse.ArgumentParser({
  version: "1",
  addHelp: true
});
const subParsers = parser.addSubparsers({
  title: "subcommands",
  dest: "subcommandName"
});

const parserIndex = subParsers.addParser("index", { addHelp: true });
parserIndex.addArgument("location", { help: "Source location to scan" });

const parserServe = subParsers.addParser("serve", { addHelp: true });
parserServe.addArgument(["-a", "--host"], {
  help: "Hostname",
  defaultValue: "0.0.0.0"
});
parserServe.addArgument(["-p", "--port"], {
  help: "port",
  defaultValue: "6644"
});

const args: BaseArgs = parser.parseArgs();
const logger = new Logger();
const context = new Context();

if (args.subcommandName === "index") {
  const parser = new MediaParser(logger);
  const indexer = new IndexLibrary(logger, parser, context.fileRepostitory);
  indexer.index((args as IndexArgs).location);
} else if (args.subcommandName === "serve") {
  const serverArgs = args as ServerArgs;
  serve(parseInt(serverArgs.port, 10), serverArgs.host);
}
