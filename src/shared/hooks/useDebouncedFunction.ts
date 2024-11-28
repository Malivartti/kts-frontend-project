import { useRef } from 'react';

export default function useDebouncedFunction(func: () => void, delay: number) {
  const ref = useRef(null);

  return () => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => func(), delay);
  };
}