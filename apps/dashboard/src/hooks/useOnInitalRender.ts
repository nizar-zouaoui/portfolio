import { useRef, useEffect } from "react";

const useOnInitalRender = (
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

export default useOnInitalRender;
