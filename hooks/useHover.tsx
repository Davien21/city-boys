import { useState, useEffect, useRef } from "react";

function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef<HTMLElement | null>(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return [ref, value];
}

export { useHover };
