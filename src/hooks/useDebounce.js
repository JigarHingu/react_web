import { useState, useEffect } from 'react';

// This custom hook takes a value and a delay time.
// It will return a new value that only updates after the specified delay.
function useDebounce(value, delay) {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer that will update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // This is the cleanup function. If the original 'value' changes before
    // the timer finishes, this function will clear the old timer, preventing
    // the old value from being set.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run this effect only if the value or delay changes

  return debouncedValue;
}

export default useDebounce;