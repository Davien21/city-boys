import { useEffect } from "react";

const useEscapeKey = (callback: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "Escape") callback(event);
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [callback]);
};

export { useEscapeKey };
