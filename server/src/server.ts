import express from "express";
import { routes as apiRoutes } from "./controllers/api";

export function serve(port: number, host: string): void {
  const app = express();
  app.use("/api", apiRoutes);
  app.listen(port, host, () => {
    console.log(`Happily listening at ${host}:${port}`);
  });
}
