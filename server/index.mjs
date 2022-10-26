import express from "express";
import path from "path";
import fs from "fs";
import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";

import { render } from '../dist/server/entry-server.mjs'

const baseHtml = fs.readFileSync(path.join(process.cwd(), "dist/client/index.html"), 'utf-8')

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
  const [begin, end] = baseHtml.split('<!-- CONTENT -->')
  const { jsx, ssr } = render()

  let didError = false;

  const stream = new Writable({
    write(chunk, _encoding, cb) {
      res.write(chunk, cb);
    },
    final() {
      const newEnd = end.replace('<!-- DATA -->', `<script>window.urqlData=${JSON.stringify(ssr.extractData())}</script>`)
      res.end(newEnd);
    },
  });

  const { pipe } = renderToPipeableStream(
    jsx,
    {
      onShellReady() {
        res.write(begin);
        pipe(stream);
      },
      onError(err) {
        didError = true;
        console.error(err);
      },
    }
  );

  return stream
});

app.use(express.static(path.join(process.cwd(), "dist/client")));

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
