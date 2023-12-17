function setTheme(theme) {
  document.querySelector('.theme_toggler').dataset.theme = theme;
  document.body.className = theme;
}

export default setTheme;
