export interface ICacheService {
  get<T>(key: string): Promise<T | null>;
  set<T = any>(key: string, value: T, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
}
