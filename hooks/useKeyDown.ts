import { useEffect } from "react";

const useKeyDown = (
  isEnabled: boolean,
  onKeydown: (event: KeyboardEvent) => void
) => {
  useEffect(() => {
    if (!isEnabled) return;
    const handleKeydown = (event: KeyboardEvent) => {
      onKeydown(event);
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isEnabled, onKeydown]);
};

export { useKeyDown };
