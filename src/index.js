import dotenv from "dotenv";
import connectDB from "./db/index.js"; // MongoDB connection
import { app } from "./app.js"; // Import the app setup
import "./config/redisClient.js"; // Ensure Redis connection on startup

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
