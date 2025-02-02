import {createClient}  from "redis";

const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("Redis Error:", err));

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("Redis connected successfully!");
  } catch (error) {
    console.error("Redis Connection Error:", error);
  }
};

connectRedis();

export default {redisClient};
