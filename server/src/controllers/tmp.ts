import express from "express";

export const routes = express.Router();
routes.get("/files", async (req: express.Request, res: express.Response) => {
  res.json({ hello: "world!" });
});
