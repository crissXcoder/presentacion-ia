import { useEffect } from "react";

export interface NavigateOptions {
  /** true cuando la URL ya cambió (popstate): no volver a hacer pushState. */
  skipHistory?: boolean;
}

interface DeckNavigationArgs {
  navigate: (to: number, options?: NavigateOptions) => void;
  /** Avanza/retrocede respetando la zona (flujo principal o respaldo). */
  step: (direction: 1 | -1) => void;
  goHome: () => void;
  goEnd: () => void;
  isIndexOpen: boolean;
  toggleIndex: () => void;
  closeIndex: () => void;
  togglePresenter: () => void;
}

/**
 * Navegación global del deck: teclado (← → / Espacio / PageUp-Down /
 * Home / End, I para el índice, Esc cierra) y botones atrás/adelante
 * del navegador (popstate). Los límites de cada zona (flujo principal
 * 1..16, respaldo 17..20) los aplica `step` en el Deck; las slides de
 * respaldo solo se alcanzan por índice o deep-link.
 */
export function useDeckNavigation({
  navigate,
  step,
  goHome,
  goEnd,
  isIndexOpen,
  toggleIndex,
  closeIndex,
  togglePresenter,
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
      if (event.key === "p" || event.key === "P") {
        togglePresenter();
        return;
      }
      // Con el índice abierto, las flechas no cambian de slide por debajo.
      if (isIndexOpen) return;

      switch (event.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          event.preventDefault();
          step(1);
          break;
        case "ArrowLeft":
        case "PageUp":
          event.preventDefault();
          step(-1);
          break;
        case "Home":
          event.preventDefault();
          goHome();
          break;
        case "End":
          event.preventDefault();
          goEnd();
          break;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [step, goHome, goEnd, isIndexOpen, toggleIndex, closeIndex, togglePresenter]);

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
