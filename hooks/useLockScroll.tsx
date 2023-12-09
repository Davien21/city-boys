import React, { useEffect } from "react";

export function useLockScroll(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) document.documentElement.classList.add("hide-overflow");
    else document.documentElement.classList.remove("hide-overflow");
    return () => {
      document.documentElement.classList.remove("hide-overflow");
    };
  }, [isLocked]);
}
