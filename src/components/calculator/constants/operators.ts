export const OPERATORS = {
  ADD: { label: "+", symbol: "+", fn: (a: number, b: number) => a + b },
  SUBSTRACT: { label: "-", symbol: "-", fn: (a:number, b:number) => a - b },
  MULTIPLY: { label: "×", symbol: "*", fn: (a:number, b:number) => a * b },
  DIVIDE: { label: "÷", symbol: "/", fn: (a:number, b:number) => (b === 0 ? "Error" : a / b) },
} as const;
