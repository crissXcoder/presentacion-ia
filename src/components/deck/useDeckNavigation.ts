import { useEffect } from "react";

export interface NavigateOptions {
  /** true cuando la URL ya cambió (popstate): no volver a hacer pushState. */
  skipHistory?: boolean;
}

interface DeckNavigationArgs {
  current: number;
  total: number;
  navigate: (to: number, options?: NavigateOptions) => void;
  isIndexOpen: boolean;
  toggleIndex: () => void;
  closeIndex: () => void;
}

/**
 * Navegación global del deck: teclado (← → / Espacio / PageUp-Down /
 * Home / End, I para el índice, Esc cierra) y botones atrás/adelante
 * del navegador (popstate). Los límites 1..total los aplica navigate.
 */
export function useDeckNavigation({
  current,
  total,
  navigate,
  isIndexOpen,
  toggleIndex,
  closeIndex,
}: DeckNavigationArgs): void {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      if (event.key === "Escape") {
        closeIndex();
        return;
      }
      if (event.key === "i" || event.key === "I") {
        toggleIndex();
        return;
      }
      // Con el índice abierto, las flechas no cambian de slide por debajo.
      if (isIndexOpen) return;

      switch (event.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          event.preventDefault();
          navigate(current + 1);
          break;
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          navigate(current - 1);
          break;
        case "Home":
          event.preventDefault();
          navigate(1);
          break;
        case "End":
          event.preventDefault();
          navigate(total);
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [current, total, navigate, isIndexOpen, toggleIndex, closeIndex]);

  useEffect(() => {
    function onPopState() {
      const match = window.location.pathname.match(/\/slide\/(\d+)/);
      if (!match) return;
      navigate(Number(match[1]), { skipHistory: true });
    }

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [navigate]);
}
