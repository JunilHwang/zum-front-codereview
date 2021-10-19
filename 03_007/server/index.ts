import * as express from "express";
import { createServer } from "http";
import * as cors from "cors";

const app: express.Application = express();
const port: number = 5000;
const server = createServer(app);

app.get("/", (req: express.Request, res: express.Response) =>
  res.send("hello world")
);

app.use(
  cors({
    origin: "*",
  })
);
// cors 허용
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// deprecated 된 body-parser 대신 사용

app.get("/api", (req: express.Request, res: express.Response) =>
  res.json({ ok: true, user: "nr2p" })
);

server.listen(port, () => console.log(`port ${port} listening`));
