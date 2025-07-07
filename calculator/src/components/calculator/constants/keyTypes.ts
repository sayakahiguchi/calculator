export const KEY_TYPES = {
  DIGIT: "digit",
  DECIMAL: "decimal",
  OPERATOR: "operator",
  EQUAL: "equal",
  CLEAR: "clear",
  TOGGLE_SIGN: "toggle-sign",
  PERCENT: "percent",
  DOUBLE_ZERO: "double-zero",
  BACKSPACE: "backspace",
} as const;

export const KEY_TYPE_VALUES:String[] = [
  "digit",
  "decimal",
  "operator",
  "equal",
  "clear",
  "toggle-sign",
  "percent",
  "double-zero",
  "backspace",
] as const;