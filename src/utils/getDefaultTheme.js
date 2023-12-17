import { STORAGE_THEME_NAME, THEMES } from '../enums/themes.js';

function getDefaultTheme() {
  const saved_theme = localStorage.getItem(STORAGE_THEME_NAME);
  if (saved_theme) return saved_theme;

  if (window.matchMedia) {
    if (window.matchMedia('(forced-colors: active)').matches)
      return THEMES.CONTRAST;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
      return THEMES.DARK;
    if (window.matchMedia('(prefers-color-scheme: light)').matches)
      return THEMES.LIGHT;
  }
  return THEMES.DARK;
}

export default getDefaultTheme;
