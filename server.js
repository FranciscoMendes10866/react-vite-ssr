import fs from "fs";
import path from "path";

import { createApp } from "h3";
import { createServer as createViteServer } from "vite";
import { listen } from "listhen";

const bootstrap = async () => {
  const app = createApp();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(path.resolve("./index.html"), "utf-8");

      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");

      const appHtml = await render({ path: url });

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html").end(html);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      next(error);
    }
  });

  return { app };
};

bootstrap()
  .then(async ({ app }) => {
    try {
      await listen(app, { port: 3333 });
    } catch (error) {
      throw error;
    }
  })
  .catch(console.error);
