import { useId as useReactId } from 'react';

const useId: (defaultId?: string) => string = (defaultId) => {
  const reactId = useReactId();

  return defaultId ?? reactId;
};

export default useId;
