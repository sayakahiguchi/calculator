/**
 * Represents the main Calculator UI component, responsible for managing the display,
 * keypad, and calculator logic. Handles user interactions and updates the display
 * based on calculator operations.
 *
 * @remarks
 * This class initializes the calculator UI by binding the display and keypad elements,
 * and delegates key handling to the appropriate logic methods.
 *
 * @example
 * ```typescript
 * const rootElement = document.getElementById('calculator');
 * if (rootElement) {
 *   const calculator = new Calculator(rootElement);
 * }
 * ```
 */
import "../calculator.scss";
import { KEY_TYPES } from "../constants/keyTypes";
import { OPERATORS } from "../constants/operators";
import { CalculatorLogic } from "../logic/CalculatorLogic";
import type { KeyType, OperatorSymbol } from "../types/calculator";
import { Display } from "./Display";
import { Keypad } from "./Keypad";

export class Calculator {
  private display: Display;
  keyPad: Keypad;
  private logic: CalculatorLogic = new CalculatorLogic();
  current: string = "0";

  static ID = {
    ROOT: "calculator",
    DISPLAY: "calculator-display",
    BUTTON_PANEL: "calculator-keypad",
  };


  /**
   * Initializes a new instance of the Calculator class.
   *
   * @param root - The root HTML element that contains the calculator UI.
   * @throws {Error} If the required display or button panel elements are not found in the DOM.
   */
  constructor() {
    const displayEl = document.getElementById(Calculator.ID.DISPLAY);
    const buttonsEl = document.getElementById(Calculator.ID.BUTTON_PANEL);

    if (!displayEl || !buttonsEl) throw new Error("必要な要素が見つかりません");
    if (!(displayEl instanceof HTMLElement) || !(buttonsEl instanceof HTMLElement))
      throw new Error("必要な要素が見つかりません");

    this.display = new Display(displayEl);
    this.keyPad = new Keypad(buttonsEl, this.handleKey.bind(this));
  }


  /**
   * Handles calculator key events by delegating actions to the calculator logic
   * based on the provided key type and value. Updates the display after processing.
   * @method handleKey
   * @param type { KeyType } - The type of key pressed (e.g., digit, operator, clear, etc.).
   * @param value { string } - The value associated with the key (e.g., digit character, operator symbol).
   * @returns {void}
   */
  handleKey(type: KeyType, value: string):void {
    switch (type) {
      case KEY_TYPES.DIGIT:
        this.logic.inputDigit(value);
        break;
      case KEY_TYPES.DECIMAL:
        this.logic.inputDecimal();
        break;
      case KEY_TYPES.OPERATOR:
        if (Object.values(OPERATORS).some((op) => op.symbol === value))
        this.logic.setOperator(value as OperatorSymbol);
        break;
      case KEY_TYPES.EQUAL:
        this.logic.evaluate();
        break;
      case KEY_TYPES.CLEAR:
        this.logic.clear();
        break;
        case KEY_TYPES.TOGGLE_SIGN:
        this.logic.toggleSign();
        break;
      case KEY_TYPES.PERCENT:
        this.logic.percent();
        break;
      case KEY_TYPES.DOUBLE_ZERO:
        this.logic.inputDoubleZero();
        break;
      case KEY_TYPES.BACKSPACE:
        this.logic.backspace();
        break;

      default:
        break;
    }
    this.display.update(this.logic.current);
  }
}
