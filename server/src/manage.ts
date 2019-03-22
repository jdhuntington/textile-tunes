import argparse from "argparse";
import { IndexLibrary } from "./actions/indexLibrary";
import { Logger } from "./logger";
import { Context } from "./repositories/context";
import { MediaParser } from "./mediaParser";

interface IndexArgs {
  location: string;
}

type args = (IndexArgs) & { subcommandName: string };
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

const args: args = parser.parseArgs();
const logger = new Logger();
const context = new Context();
if (args.subcommandName === "index") {
  const parser = new MediaParser(logger);
  const indexer = new IndexLibrary(logger, parser, context.fileRepostitory);
  indexer.index((args as IndexArgs).location);
}
