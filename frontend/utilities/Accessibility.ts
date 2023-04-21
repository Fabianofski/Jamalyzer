export function getPrefersReducedMotion() {
  const QUERY = "(prefers-reduced-motion: no-preference)";
  const mediaQueryList = window.matchMedia(QUERY);
  return !mediaQueryList.matches;
}
