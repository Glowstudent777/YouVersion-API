import Redis from "ioredis";

export const redis = new Redis(
  process.env.REDIS_URL ?? "redis://default:SecurePassword@localhost:6379",
  {
    tls: {
      rejectUnauthorized: false,
    },
  }
);

export function connectRedis() {
  redis
    .connect()
    .then(() => {
      console.log("Connected to Redis");
    })
    .catch((err) => {
      console.error("Error connecting to Redis", err);
    });
}

export function getVotdExpireTime(): number {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(6, 0, 0, 0);

  const now = new Date();
  const diff = tomorrow.getTime() - now.getTime();
  const seconds = Math.floor(diff / 1000);

  return seconds;
}

export function clearVotdCache() {
  redis.del("votd");
}
