/**
 * Represents a calculator key UI component.
 * Handles initialization, click events, and UI state (enabled/disabled/highlighted) for a button element.
 *
 * @remarks
 * - Expects the button element to have a `data-key-type` attribute and a `value`.
 * - Throws errors if required attributes are missing or invalid.
 *
 * @example
 * ```typescript
 * const button = document.createElement('button');
 * button.dataset.keyType = 'number';
 * button.value = '1';
 * const key = new Key(button, (type, value) => { ... });
 * ```
 */

import { KEY_TYPE_VALUES } from "../constants/keyTypes";
import type { KeyType } from "../types/calculator";

export class Key {
  private el: HTMLButtonElement;
  private onClick: (type: KeyType, value: string) => void;
  private type: KeyType;
  private value: string;

  static CLASS_NAMES = {
    BUTTON: "js-calculator-button",
  };


  constructor(el: HTMLButtonElement, onClick: (type: KeyType, value: string) => void) {
    this.el = el;
    this.onClick = onClick;

    const dataKeyType: string | undefined = this.el.dataset.keyType;
    if (!dataKeyType) {
      throw new Error("Button is missing data-key-type attribute.");
    }
    if (!Object.values(KEY_TYPE_VALUES).includes(dataKeyType)) {
        throw new Error("data-key-type attribute is invalid.");
    }
    if (!this.el.value) {
        throw new Error("Key is missing the value.");
    }

    this.type = dataKeyType as KeyType;
    this.value = this.el.value;

    this.el.addEventListener('click', this.handleClick.bind(this));
  }

  get elelemt():HTMLButtonElement {
    return this.el;
  }

  private handleClick() {
    this.onClick(this.type, this.value);
  }

  public disable() {
    this.el.disabled = true;
  }

  public enable() {
    this.el.disabled = false;
  }

  public highlight(toggle: boolean) {
    this.el.classList.toggle('is-active', toggle);
  }
}
