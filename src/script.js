import Calculator from './Calculator';
import { THEMES } from './enums/themes';
import getDefaultTheme from './utils/getDefaultTheme';
import saveTheme from './utils/saveTheme';
import setTheme from './utils/setTheme';

//Set default theme
setTheme(getDefaultTheme());
setTheme('dark');
//Change theme on button click
handleThemeChange();

//Init calculator
const primaryOperandDisplay = document.querySelector(
  '.primary-operand [data-value]',
);
const secondaryOperandDisplay = document.querySelector(
  '.secondary-operand [data-value]',
);
const operationDisplay = document.querySelector(
  '.secondary-operand [data-operation]',
);

const calculator = new Calculator(
  primaryOperandDisplay,
  secondaryOperandDisplay,
  operationDisplay,
);

calculator.primaryOperand = 399981;
document.addEventListener('click', (e) => {
  if (e.target.matches('[data-clear]')) {
    calculator.clear();
  }
  if (e.target.matches('[data-delete]')) {
    calculator.removeDigit();
  }
  if (e.target.matches('[data-number]')) {
    calculator.addDigit(e.target.textContent);
  }
  if (e.target.matches('[data-operation]')) {
    calculator.chooseOperation(e.target.textContent);
  }
  if (e.target.matches('[data-evaluate]')) {
    calculator.evaluate();
  }
});

function handleThemeChange() {
  function setAndSaveTheme(theme) {
    setTheme(theme);
    saveTheme(theme);
  }

  const change_theme_dark = document.querySelector('#changeTheme_dark');
  const change_theme_light = document.querySelector('#changeTheme_light');
  const change_theme_contrast = document.querySelector('#changeTheme_contrast');
  change_theme_dark.addEventListener('click', () =>
    setAndSaveTheme(THEMES.DARK),
  );
  change_theme_light.addEventListener('click', () =>
    setAndSaveTheme(THEMES.LIGHT),
  );
  change_theme_contrast.addEventListener('click', () =>
    setAndSaveTheme(THEMES.CONTRAST),
  );
}
