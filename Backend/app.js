import express from "express";
import cors from "cors";
import connectDB from "./db/index.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB()
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("API is working with MongoDB");
});

export default app;
