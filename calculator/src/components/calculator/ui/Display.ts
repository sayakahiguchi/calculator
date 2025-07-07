
/**
 * Represents a display component for a calculator UI.
 *
 * The `Display` class manages an HTML element used to show values in a calculator.
 * It formats numeric values according to the user's locale and updates the display accordingly.
 *
 * @remarks
 * - Uses `Intl.NumberFormat` for locale-aware number formatting.
 * - Accepts both numeric and non-numeric string values for display.
 *
 * @example
 * ```typescript
 * const displayElement = document.getElementById('display');
 * const display = new Display(displayElement);
 * display.update('12345.6789'); // Displays formatted number
 * display.update('Error');      // Displays 'Error' as-is
 * ```
 */
export class Display {
    private el: HTMLElement;
    private locales: string;
    private formater: Intl.NumberFormat

    /**
     * Creates an instance of the Display class.
     *
     * @param el { HTMLElement } - The HTML element associated with the display.
     */
    constructor(el: HTMLElement) {
        this.el = el;
        // sets the user's locale from the browser.
        this.locales = navigator.language;
        // creates a number formatter for displaying numbers with up to 20 fraction digits and 21 significant digits.
        this.formater = new Intl.NumberFormat(this.locales, {
            maximumFractionDigits: 20,
            maximumSignificantDigits: 21
        })
    }

    get element():HTMLElement {
        return this.el;
    }

    /**
     * Updates the display element with the provided value.
     *
     * If the value is numeric, it formats the number using the instance's formatter
     * before displaying it. Otherwise, it displays the value as-is.
     *
     * @param val {string} - The value to display. Can be a numeric string or any other string.
     * @returns {void} The value that was set as the text content of the display element.
     */
    public update(val: string):void {
        console.log(val);
        const isNumeric: boolean = /^-?\d+(\.\d+)?$/.test(val);
        this.el.textContent = isNumeric ? this.formater.format(Number(val)) : val;
    }
}