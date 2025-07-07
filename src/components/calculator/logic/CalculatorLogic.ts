/**
 * CalculatorLogic encapsulates the core logic for a calculator, handling input, operations, and evaluation.
 *
 * @remarks
 * This class manages the state of the calculator, including the current value, operands, operators, and evaluation history.
 * It provides methods for digit input, operator selection, evaluation, and utility functions such as percent, sign toggle, and backspace.
 */
import { OPERATORS } from "../constants/operators";
import type { OperatorSymbol } from "../types/calculator";

export class CalculatorLogic {
  operand: string | null = null;
  operator: OperatorSymbol | null = null;
  lastOperand: string | null = null;
  lastOperator: OperatorSymbol | null = null;
  private justEvaluated: boolean = false;
  current: string = "0";

  /**
   * Resets the calculation history by clearing the last operand and operator.
   * This method sets both `lastOperand` and `lastOperator` to `null`,
   * effectively removing any previous calculation state.
   *
   * @private
   */
  private resetHistory() {
    this.lastOperand = null;
    this.lastOperator = null;
  }

  /**
   * @method inputDigit
   *
   * Handles the input of a digit by the user.
   *
   * If a calculation was just evaluated, this method resets the current value to the new digit
   * and marks the evaluation state as false. Otherwise, it appends the digit to the current value,
   * or replaces the current value if it is "0" or if an operator was just selected.
   * Also resets the calculation history.
   *
   * @param { String } digit - The digit character to input (e.g., "0"–"9").
   */
  inputDigit(digit: string) {
    if (this.justEvaluated) {
      this.current = digit;
      this.justEvaluated = false;
      return;
    }
    this.current =
      this.current === "0" || (this.operator != null && this.current === this.operand)
        ? digit
        : (this.current += digit);
    this.resetHistory();
  }

  /**
   * @method inputDoubleZero
   * @returns {void}
   */
  inputDoubleZero(): void {
    if (this.current === "0") return;
    this.inputDigit("00");
  }

  inputDecimal(): void {
    this.current = this.current === "0" ? "0." : (this.current += ".");
    this.resetHistory();
  }

  /**
   * @method
   * Toggles the sign of the current value.
   *
   * If the current value is "0", the method does nothing.
   * If the current value starts with a minus sign, it removes it (making the value positive).
   * Otherwise, it prepends a minus sign (making the value negative).
   * After toggling the sign, it resets the calculation history.
   * @returns {void}
   */
  toggleSign(): void {
    if (this.current === "0") return;
    if (this.current.startsWith("-")) {
      this.current = this.current.slice(1);
    } else {
      this.current = "-" + this.current;
    }
    this.resetHistory();
  }

  /**
   * @method percent
   * @returns {void}
   */
  percent(): void {
    this.current = String(Number(this.current) / 100);
    this.resetHistory();
  }

  /**
   * Sets the current operator for the calculator logic.
   *
   * If the same operator is selected consecutively and the last action was not an evaluation,
   * it triggers an evaluation of the current expression. Then, it updates the operand and operator, and resets the calculation history.
   *
   * @param { OperatorSymbol } symbol - The operator symbol to set (e.g., '+', '-', '*', '/').
   */
  setOperator(symbol: OperatorSymbol): void {
    if (this.operator === symbol && !this.justEvaluated) {
      this.evaluate();
    }
    this.operand = this.current;
    this.operator = symbol;
    this.resetHistory(); // resets the calculation history.
  }

  /**
   * @method backspace
   */
  /**
   * Removes the last character from the current input.
   * If the current input has only one character, resets it to "0".
   * After updating the current input, resets the calculation history.
   */
  backspace() {
    if (this.current.length === 1) {
      this.current = "0";
    } else {
      this.current = this.current.slice(0, -1);
    }
    this.resetHistory();
  }

  /**
   * @method
   * Evaluates the current calculation based on the stored operator and operands.
   *
   * - If a previous operand (`lastOperand`) exists, it uses the last operator and last operand
   *   to perform the calculation with the current value.
   * - Otherwise, it uses the current operator and operand for the calculation,
   *   and stores them as the last used values for potential repeated evaluations.
   *
   * @remarks
   * This method assumes that the operands and operators are managed elsewhere in the class.
   * It handles both repeated and new evaluations, supporting calculator-like behavior.
   */
  evaluate(): void {
    if (!this.operator || !this.operand) return;
    let a: number, b: number, opFn;

    if (this.lastOperand) {
      a = Number(this.lastOperand);
      b = Number(this.current);

      opFn = Object.values(OPERATORS).find((o) => o.symbol === this.lastOperator)?.fn;
      if (!opFn) {
        this.current = "Error";
        return;
      }
      const result = opFn(a, b);
      this.current = String(result);
    } else {
      a = Number(this.operand);
      b = Number(this.current);

      this.lastOperand = this.current;
      this.lastOperator = this.operator;

      opFn = Object.values(OPERATORS).find((o) => o.symbol === this.operator)?.fn;
      if (!opFn) {
        this.current = "Error";
        return;
      }
      const result = opFn(a, b);
      // Updates the `current` value with the result or sets it to "Error" if the operator is invalid.
      this.current = String(result);
    }

    //  Sets the `justEvaluated` flag to `true` after evaluation.
    this.justEvaluated = true;
  }

  /**
   * @method
   * resets the calculation history.
   */
  clear() {
    this.current = "0";
    this.operand = null;
    this.operator = null;
    this.resetHistory();
  }
}
