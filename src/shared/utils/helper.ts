import { LocalStorageKey } from "../constants/local-storage-key";

export function getSavedValue(key: LocalStorageKey, initialValue: any) {
  const savedValue = localStorage.getItem(key);
  if (savedValue) return JSON.parse(savedValue);

  if (initialValue instanceof Function) return initialValue();
  return initialValue ?? "";
}

export function getSortedArrayByKey(data: any[], key: string){
  return data.sort((a, b) =>  {
    const x = a[key]
    const y = b[key]
    return (x < y) ? -1 : (x > y ? 1 : 0);
  })
}