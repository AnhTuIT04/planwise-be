export interface ICacheService {
  get<T>(key: string): Promise<T | null>;
  set<T = any>(key: string, value: T, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
  /**
   * Atomically acquires a lock: sets the key only if it does not already exist.
   * Returns true if the lock was acquired, false if another holder owns it.
   */
  tryLock(key: string, ttlSeconds: number): Promise<boolean>;
}
