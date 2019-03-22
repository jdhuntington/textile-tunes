import { FileRepository, JsonFileRepository } from "./fileRepository";

export class Context {
  public fileRepostitory: FileRepository = new JsonFileRepository();
}
