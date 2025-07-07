import { describe, it, expect, beforeEach } from 'vitest';
import { CalculatorLogic } from '../logic/CalculatorLogic';

describe('CalculatorLogic', () => {
  let calc: CalculatorLogic;

  beforeEach(() => {
    calc = new CalculatorLogic();
  });

  it('performs addition', () => {
    calc.inputDigit('1');
    calc.inputDigit('2');
    calc.setOperator('+');
    calc.inputDigit('7');
    calc.evaluate();
    expect(calc.current).toBe('19');
  });

  it('performs subtraction', () => {
    calc.inputDigit('9');
    calc.setOperator('-');
    calc.inputDigit('5');
    calc.evaluate();
    expect(calc.current).toBe('4');
  });

  it('performs multiplication', () => {
    calc.inputDigit('3');
    calc.setOperator('*');
    calc.inputDigit('4');
    calc.evaluate();
    expect(calc.current).toBe('12');
  });

  it('performs division', () => {
    calc.inputDigit('8');
    calc.setOperator('/');
    calc.inputDigit('2');
    calc.evaluate();
    expect(calc.current).toBe('4');
  });

  it('handles division by zero', () => {
    calc.inputDigit('8');
    calc.setOperator('/');
    calc.inputDigit('0');
    calc.evaluate();
    expect(calc.current).toBe('Error');
  });

  it('supports decimal input', () => {
    calc.inputDigit('3');
    calc.inputDecimal();
    calc.inputDigit('1');
    expect(calc.current).toBe('3.1');
  });

  it('supports double zero input', () => {
    calc.inputDigit('1');
    calc.inputDoubleZero();
    expect(calc.current).toBe('100');
  });

  it('toggles sign', () => {
    calc.inputDigit('5');
    calc.toggleSign();
    expect(calc.current).toBe('-5');
    calc.toggleSign();
    expect(calc.current).toBe('5');
  });

  it('calculates percent', () => {
    calc.inputDigit('5');
    calc.inputDigit('0');
    calc.percent();
    expect(calc.current).toBe('0.5');
  });

  it('supports backspace', () => {
    calc.inputDigit('1');
    calc.inputDigit('2');
    calc.backspace();
    expect(calc.current).toBe('1');
    calc.backspace();
    expect(calc.current).toBe('0');
  });

  it('clears all', () => {
    calc.inputDigit('9');
    calc.setOperator('+');
    calc.inputDigit('1');
    calc.clear();
    expect(calc.current).toBe('0');
  });

  it('performs chained operations', () => {
    // 12 + 7 + 8 = 27
    calc.inputDigit('1');
    calc.inputDigit('2');
    calc.setOperator('+');
    calc.inputDigit('7');
    calc.setOperator('+'); // ←ここで 12 + 7 評価 → current: "19"
    calc.inputDigit('8');
    calc.evaluate(); // 19 + 8
    expect(calc.current).toBe('27');
  });

  it('resets current after evaluation', () => {
    calc.inputDigit('3');
    calc.setOperator('+');
    calc.inputDigit('4');
    calc.evaluate();
    calc.inputDigit('2');
    expect(calc.current).toBe('2');
  });
});
