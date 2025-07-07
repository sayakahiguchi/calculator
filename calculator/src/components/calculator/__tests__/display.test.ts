import { describe, it, expect, beforeEach } from 'vitest';
import { Display } from '../ui/Display';

describe('Display', () => {
  let root: HTMLElement;
  let display: Display;

  beforeEach(() => {
    document.body.innerHTML = `<div class="c-calculator"><div class="c-calculator__display" id="js-display">0</div></div>`;

    root = document.querySelector('.c-calculator')!;
    display = new Display(root);
  });

  it('should render the initial value', () => {
    expect(display.element.textContent).toBe('0');
  });

  it('should update with integer values and format them', () => {
    display.update('1234');
    expect(display.element.textContent).toBe('1,234');
  });

  it('should update with decimal values and format them', () => {
    display.update('1234.56');
    expect(display.element.textContent).toBe('1,234.56');
  });

  it('should show "Error" without formatting', () => {
    display.update('Error');
    expect(display.element.textContent).toBe('Error');
  });

  it('should expose the current value as a property', () => {
    display.update('42');
    expect(display.element.textContent).toBe('42');
  });
});
