import { useCallback, useEffect, useRef } from "react";

const useOnInitialRender = (
  callback: () => void | (() => void),
  deps?: React.DependencyList
) => {
  const hasRendered = useRef(false);
  const cleanupRef = useRef<(() => void) | void>();

  // Memoize the callback to prevent infinite re-renders
  const memoizedCallback = useCallback(callback, deps || []);

  useEffect(() => {
    if (!hasRendered.current) {
      cleanupRef.current = memoizedCallback();
      hasRendered.current = true;
    }

    // Return cleanup function if provided
    return () => {
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
      }
    };
  }, [memoizedCallback]);
};

export default useOnInitialRender;
