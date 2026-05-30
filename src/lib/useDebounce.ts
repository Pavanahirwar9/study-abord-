// src/lib/useDebounce.ts
"use client";

import { useEffect, useState } from "react";

/**
 * useDebounce - delays updating the returned value until after `delay` ms
 * have elapsed since the last change to `value`.
 *
 * Used in search inputs to reduce API calls while the user is typing.
 * Without debounce: every keystroke fires an API request.
 * With debounce: only fires after the user stops typing for `delay` ms.
 */
function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear timer on every value change — resets the countdown
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
