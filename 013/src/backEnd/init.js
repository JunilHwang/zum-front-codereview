import "@babel/polyfill"
import app from "./app";

const PORT = 8000;

const Listening = () =>
    console.log(`✅ Listening on :http://localhost:${PORT}`);

app.listen(PORT, Listening);