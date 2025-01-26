import cache from "memory-cache";

export const apiCache = new cache.Cache();

export function getVotdExpireTime(): number {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(6, 0, 0, 0);

  const now = new Date();
  const diff = tomorrow.getTime() - now.getTime();
  const seconds = Math.floor(diff / 1000);

  return seconds;
}

export function getFromCache(
  key: string,
  callback: (err: Error | null, data: any) => void
): void {
  try {
    const data = apiCache.get(key);

    if (data) {
      callback(null, data);
    } else {
      callback(new Error("Data not found in cache"), null);
    }
  } catch (err: Error | any) {
    callback(err as Error, null);
  }
}

export function setToCache(key: string, value: any, expireTime: number): void {
  apiCache.put(key, value, expireTime * 1000);
}

export function clearVotdCache() {
  apiCache.del("votd");
}
