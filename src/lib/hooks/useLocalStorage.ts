import { useState } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue: any
): [any, (value: any | ((prev: any) => any)) => void] => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  const setLocalStorage = (newValue: any | ((prev: any) => any)) => {
    setValue((prev: any) => {
      const valueToStore =
        typeof newValue === 'function'
          ? (newValue as (prev: any) => any)(prev)
          : newValue;
      localStorage.setItem(key, JSON.stringify(valueToStore));
      return valueToStore;
    });
  };

  return [value, setLocalStorage];
};
