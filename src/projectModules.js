// Share lazy imports with intent preloading; the browser caches each module.
export const projectModules = {
  assistant: () => import('./AIA'),
  spaces: () => import('./PDFSpaces'),
  sezzle: () => import('./SezzleUp'),
};

export function preloadProject(theme) {
  projectModules[theme]?.().catch(() => {});
}
