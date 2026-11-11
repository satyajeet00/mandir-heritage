import { useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible modal behaviour: Esc closes, Tab is trapped inside, body scroll is locked,
 * and focus returns to the trigger on close. Attach the returned ref to the dialog element.
 */
export function useModal<T extends HTMLElement>(isOpen: boolean, onClose: () => void) {
  const ref = useRef<T>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;
    const node = ref.current;
    const trigger = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      node ? Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];
    (focusables()[0] ?? node)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      trigger?.focus?.();
    };
  }, [isOpen]);

  return ref;
}
