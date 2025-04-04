import { Dimensions } from "@/interfaces";
import { useMemo, useSyncExternalStore, useRef, RefObject } from "react";

function subscribe(callback: () => void): () => void {
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("resize", callback);
  };
}

function useDimensions<T extends HTMLElement>(
  ref: RefObject<T | null>
): Dimensions {
  const dimensions = useSyncExternalStore(subscribe, () =>
    JSON.stringify({
      width: ref.current?.offsetWidth ?? 0,
      height: ref.current?.offsetHeight ?? 0,
    })
  );

  return useMemo(() => JSON.parse(dimensions) as Dimensions, [dimensions]);
}

export { useDimensions };
