import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

const app = express();

// Add middleware to parse JSON
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

console.log("MongoDB Connection String:", process.env.MONGO);

app.listen(3000, () => {
  console.log("Server is running on port 300!");
});

// routes declared
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// 111.88.123.187/32