import argparse from "argparse";
import { IndexLibrary } from "./actions/indexLibrary";
import { Logger } from "./logger";

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
if (args.subcommandName === "index") {
  const indexer = new IndexLibrary(logger);
  indexer.index((args as IndexArgs).location);
}
