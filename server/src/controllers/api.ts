import express, { Request, Response } from "express";
import { Context } from "../repositories/context";

export const routes = express.Router();

const context = new Context();

routes.get("/everything", async (req: Request, res: Response) => {
  const everything = await context.fileRepostitory.allFiles();
  res.json(everything);
});

routes.get("/files/:fileId", async (req: Request, res: Response) => {
  const mediaFile = await context.fileRepostitory.find(req.params["fileId"]);
  if (mediaFile.backed) {
    res.sendFile(mediaFile.path);
  } else {
    res.status(404).json({ error: "File not found." });
  }
});
