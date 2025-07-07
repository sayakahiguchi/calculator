import type { KEY_TYPE_VALUES } from "../constants/keyTypes";
import type {OPERATORS } from "../constants/operators";

// Operator名（'Add' | 'Subtract' | ...）
export type OperatorKey = keyof typeof OPERATORS;

// プログラム上で使う記号の型（'+' | '-' | '*' | '/'）
export type OperatorSymbol = typeof OPERATORS[OperatorKey]['symbol'];

// fn戻り値は number | 'Error' 型として補完
export type OperatorFunction = typeof OPERATORS[OperatorKey]['fn'];

export type KeyType = typeof KEY_TYPE_VALUES[number];
