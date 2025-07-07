import type { KeyType } from "../types/calculator";

export interface KeyConfig {
  type: KeyType;
  label: string;
  value: string;
}

export const keyRows: KeyConfig[][] = [
  [
    { type: "clear", label: "AC", value: "AC" },
    { type: "backspace", label: "⌫", value: "⌫" },
    { type: "percent", label: "%", value: "%" },
    { type: "operator", label: "÷", value: "/" },
  ],
  [
    { type: "digit", label: "7", value: "7" },
    { type: "digit", label: "8", value: "8" },
    { type: "digit", label: "9", value: "9" },
    { type: "operator", label: "×", value: "*" },
  ],
  [
    { type: "digit", label: "4", value: "4" },
    { type: "digit", label: "5", value: "5" },
    { type: "digit", label: "6", value: "6" },
    { type: "operator", label: "−", value: "-" },
  ],
  [
    { type: "digit", label: "1", value: "1" },
    { type: "digit", label: "2", value: "2" },
    { type: "digit", label: "3", value: "3" },
    { type: "operator", label: "+", value: "+" },
  ],
  [
    { type: "toggle-sign", label: "±", value: "±" },
    { type: "digit", label: "0", value: "0" },
    { type: "decimal", label: ".", value: "." },
    { type: "equal", label: "=", value: "=" },
  ],
];
