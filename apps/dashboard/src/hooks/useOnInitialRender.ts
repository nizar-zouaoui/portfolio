import { useEffect, useRef } from "react";

const useOnInitialRender = (
  callback: () => void,
  deps?: React.DependencyList
) => {
  const hasRendered = useRef(false);

  useEffect(() => {
    if (!hasRendered.current) {
      callback();
      hasRendered.current = true;
    }
  }, [callback, deps]);
};

export default useOnInitialRender;
