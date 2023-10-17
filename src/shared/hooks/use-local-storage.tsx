import { useEffect, useState } from "react";
import { LocalStorageKey } from "../constants/local-storage-key";
import { getSavedValue } from "../utils/helper";

function useLocalStorage(key: LocalStorageKey, initialValue?: any) {
  const [value, setValue] = useState(getSavedValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default useLocalStorage;
