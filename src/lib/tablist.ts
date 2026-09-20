import type { KeyboardEvent } from "react";

/**
 * WAI-ARIA keyboard support for a `role="tablist"` container: Left/Right move
 * between enabled tabs (wrapping), Home/End jump to the ends. Focus follows
 * selection by clicking the target tab, so the existing onClick handlers drive
 * state — no refs or extra wiring required.
 *
 * Pair with roving tabindex: give the selected tab tabIndex={0} and the rest
 * tabIndex={-1} (see `rovingTabIndex`).
 */
export function onTabListKeyDown(event: KeyboardEvent<HTMLElement>) {
  const KEYS = ["ArrowRight", "ArrowLeft", "Home", "End"];
  if (!KEYS.includes(event.key)) return;

  const tabs = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]:not([disabled])'),
  );
  if (tabs.length === 0) return;

  const active = document.activeElement as HTMLElement | null;
  const current = active ? tabs.indexOf(active) : -1;

  let next: number;
  switch (event.key) {
    case "ArrowRight":
      next = current < 0 ? 0 : (current + 1) % tabs.length;
      break;
    case "ArrowLeft":
      next = current < 0 ? tabs.length - 1 : (current - 1 + tabs.length) % tabs.length;
      break;
    case "Home":
      next = 0;
      break;
    default: // End
      next = tabs.length - 1;
  }

  event.preventDefault();
  const target = tabs[next];
  target.focus();
  target.click(); // selection follows focus
}

/** tabIndex for a roving-tabindex tablist: the active tab is focusable, others skipped. */
export function rovingTabIndex(isActive: boolean): 0 | -1 {
  return isActive ? 0 : -1;
}
