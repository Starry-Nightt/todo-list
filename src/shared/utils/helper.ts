import { LocalStorageKey } from "../constants/local-storage-key";

export function getSavedValue(key: LocalStorageKey, initialValue: any) {
  const savedValue = localStorage.getItem(key);
  if (savedValue) return JSON.parse(savedValue);

  if (initialValue instanceof Function) return initialValue();
  return initialValue ?? "";
}
