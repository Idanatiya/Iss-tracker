import { useCallback, useRef } from "react";

export type HookProps = {
  onDblClick: () => void;
  onClick: () => void;
  timeout?: number;
};

export const useMaybeDoubleClick = ({
  onDblClick,
  onClick,
  timeout = 200,
}: HookProps) => {
  const timeoutId = useRef<number | null>(null);
  const onClearTimeout = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  };

  return useCallback(
    (ev: React.MouseEvent<HTMLElement>) => {
      onClearTimeout();
      const { detail: numClick } = ev;
      console.log({ numClick });
      if (numClick === 1) {
        timeoutId.current = setTimeout(() => {
          onClick();
        }, timeout);
      }

      if (numClick % 2 === 0) {
        onDblClick();
      }
    },
    [onClick, onDblClick, timeout]
  );
};
