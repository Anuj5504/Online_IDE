import express from "express";
import cors from "cors";
import connectDB from "./db/index.js";
import userRouter from "./routes/userRoutes.js"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:4000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));

app.use(express.json());

connectDB()
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("API is working with MongoDB");
});

app.use("/api/user", userRouter)

export default app;
