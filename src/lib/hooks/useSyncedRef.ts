import { useEffect, useRef } from 'react';

const useSyncedRef = <T>(
  ref: React.Ref<T> | ((instance: T | null) => void)
): React.MutableRefObject<T | null> => {
  const innerRef = useRef<T | null>(null);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      (ref as React.MutableRefObject<T | null>).current = innerRef.current;
    }
  }, [ref]);

  return innerRef;
};

export default useSyncedRef;
