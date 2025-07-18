import express, { json } from "express";
import env from "dotenv";
import cors from "cors";
import router from "./routes.js";

env.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [
      "localhost:5173",
      "http://localhost:5173",
      "https://assesment-frontend-hazel-one.vercel.app/",
      "https://assesment-frontend-hazel-one.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
let PORT = process.env.PORT || 3000;
// let PORT = 4000;
app.use("/api", router);

app.get("/", (req, res) => {
  res.json("server is working");
});

app.listen(PORT, "localhost", () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
