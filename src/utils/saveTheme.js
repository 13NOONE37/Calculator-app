import { STORAGE_THEME_NAME } from '../enums/themes';

function saveTheme(theme) {
  localStorage.setItem(STORAGE_THEME_NAME, theme);
}

export default saveTheme;
