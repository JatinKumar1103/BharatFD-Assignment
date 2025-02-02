import dotenv from "dotenv";
import connectDB from "./db/index.js"; 
import { app } from "./app.js";
import "./config/redisClient.js"; 

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed!", err);
    process.exit(1);
  });

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
