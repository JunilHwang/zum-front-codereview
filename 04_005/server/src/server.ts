import express from "express";
import postRouter from "./routes/postRouter";
import cors from "cors";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/post", postRouter);

app.listen(PORT, () => console.log("Server On🎉"));
