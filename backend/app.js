import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import todoRoutes from "./routes/todos.js"

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/todos",todoRoutes);

export { app };
