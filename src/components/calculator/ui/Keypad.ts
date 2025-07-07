
/**
 * Represents a keypad UI component composed of multiple `Key` instances.
 * Handles initialization of keys from button elements within a given root element,
 * and provides methods to enable or disable all keys.
 *
 * @remarks
 * The `Keypad` class is responsible for managing the state of all calculator keys,
 * delegating key press events to a provided callback.
 *
 * @example
 * ```typescript
 * const keypad = new Keypad(document.getElementById('keypad-root'), (type, value) => {
 *   // handle key press
 * });
 * keypad.disableAll();
 * keypad.enableAll();
 * ```
 */
import type { KeyType } from "../types/calculator";
import { Key } from "./Key";


export class Keypad {
    private root : HTMLElement;
    private keys : Key[];


    /**
     * Creates an instance of the Keypad class.
     *
     * @param root - The root HTML element containing the keypad buttons.
     * @param onKeyPress - Callback function invoked when a key is pressed, receiving the key type and value.
     *
     * Initializes the keypad by finding all button elements within the root and creating Key instances for each,
     * passing the provided onKeyPress callback to handle key press events.
     */
    constructor(root: HTMLElement, onKeyPress:(type: KeyType, value: string) => void) {
        this.root = root;

        const buttonEls:HTMLCollectionOf<HTMLButtonElement> = this.root.getElementsByTagName('button');
        this.keys = Array.from(buttonEls).map(el => new Key(el, onKeyPress));
    }

    /**
     * Disables all keys in the keypad by invoking the `disable` method on each key.
     *
     * @remarks
     * This method iterates over the `keys` collection and disables each key,
     * typically used to prevent user interaction with the keypad.
     */
    disableAll() {
        this.keys.forEach(key => key.disable());
    }

    /**
     * Enables all keys in the keypad by calling the `enable` method on each key.
     *
     * This method iterates through the `keys` collection and activates each key,
     * allowing them to be interacted with by the user.
     */
    enableAll() {
        this.keys.forEach(key => key.enable());
    }
}