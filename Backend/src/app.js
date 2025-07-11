import express from "express";
import cors from "cors";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";

//route imports
import userRouter from "./routes/userRoutes.js";
import workspaceRouter from "./routes/workspaceRoutes.js";
import fileRouter from "./routes/fileRoutes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));

app.use(express.json());
app.use(cookieParser());

connectDB()
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("API is working with MongoDB");
});

//routes
app.use("/api/user", userRouter);
app.use("/api/workspace", workspaceRouter);
app.use("/api/file", fileRouter);

export default app;
