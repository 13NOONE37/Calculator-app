export default class Calculator {
  constructor(
    primaryOperandDisplay,
    secondaryOperandDisplay,
    operationDisplay,
  ) {
    this.#primaryOperandDisplay = primaryOperandDisplay;
    this.#secondaryOperandDisplay = secondaryOperandDisplay;
    this.#operationDisplay = operationDisplay;
    this.#isPrimaryTempoary = false;

    this.clear(); /*Comment this line for frontend mentor */
  }
  #primaryOperandDisplay;
  #secondaryOperandDisplay;
  #operationDisplay;
  #isPrimaryTempoary;

  get primaryOperand() {
    return parseFloat(this.#primaryOperandDisplay.dataset.value);
  }
  set primaryOperand(value) {
    if (value?.toString().length >= 14) {
      value = value.toString().substring(0, 13);
    }
    this.#primaryOperandDisplay.dataset.value = value ?? '';
    this.#primaryOperandDisplay.textContent = displayNumber(value ?? '');
  }

  get secondaryOperand() {
    return parseFloat(this.#secondaryOperandDisplay.dataset.value);
  }
  set secondaryOperand(value) {
    if (value?.toString().length >= 14) {
      value = value.toString().substring(0, 13);
    }
    this.#secondaryOperandDisplay.dataset.value = value ?? '';
    this.#secondaryOperandDisplay.textContent = displayNumber(value ?? '');
  }

  get operation() {
    return this.#operationDisplay.textContent;
  }
  set operation(value) {
    this.#operationDisplay.textContent = value ?? '';
  }

  addDigit(digit) {
    if (
      digit === '.' &&
      this.#primaryOperandDisplay.dataset.value.includes('.')
    ) {
      return;
    }

    if (this.primaryOperand === 0) {
      this.primaryOperand = digit;
      return;
    }

    //This behaviour is useful on simple calculator, because now we are able to power a number
    if (this.#isPrimaryTempoary) {
      this.primaryOperand = digit;
      this.#isPrimaryTempoary = false;
    } else {
      //We over
      this.primaryOperand = this.#primaryOperandDisplay.dataset.value + digit;
    }
  }

  removeDigit() {
    const numberString = this.#primaryOperandDisplay.dataset.value;
    if (numberString.length <= 1) {
      this.primaryOperand = 0;
      return;
    }
    this.primaryOperand = numberString.substring(0, numberString.length - 1);
  }

  evaluate() {
    let result;
    switch (this.operation) {
      case 'x':
        result = this.secondaryOperand * this.primaryOperand;
        break;
      case '/':
        if (this.primaryOperand === 0) {
          this.clear();
          this.#primaryOperandDisplay.textContent = 'ERROR!';
          return;
        }
        result = this.secondaryOperand / this.primaryOperand;
        break;
      case '+':
        result = this.secondaryOperand + this.primaryOperand;
        break;
      case '-':
        result = this.secondaryOperand - this.primaryOperand;
        break;
      default:
        return;
    }
    this.clear();
    this.primaryOperand = result;

    return result;
  }

  chooseOperation(operation) {
    if (this.operation !== '') {
      this.evaluate();
      this.operation = operation;
    }
    this.operation = operation;
    this.secondaryOperand = this.primaryOperand;
    this.#isPrimaryTempoary = true;
  }

  clear() {
    this.primaryOperand = 0;
    this.secondaryOperand = null;
    this.operation = null;
  }
}

const NUMBER_FORMATTER = new Intl.NumberFormat('en');
function displayNumber(number) {
  const stringNumber = number?.toString() || ''; //If number is null(initial secondary here) we return ''
  if (stringNumber === '') return '';

  const [integer, decimal] = stringNumber.split('.');
  const formattedInteger = NUMBER_FORMATTER.format(integer);
  if (decimal == null) return formattedInteger;
  return formattedInteger + '.' + decimal;
}
