import { describe, expectTypeOf, test } from 'vitest';
import type { Module } from './index.js';

declare const mod: Module;

describe('Module', () => {
  test('register takes no arguments and returns any', () => {
    expectTypeOf<Module['register']>().parameters.toEqualTypeOf<[]>();
    expectTypeOf(mod.register()).toBeAny();
  });

  test('accepts a plain object with a register method', () => {
    expectTypeOf({ register: () => undefined }).toExtend<Module>();
  });

  test('rejects a register method that requires arguments', () => {
    expectTypeOf({
      register: (name: string) => name,
    }).not.toExtend<Module>();
  });

  test('rejects an object without register', () => {
    expectTypeOf({}).not.toExtend<Module>();
    expectTypeOf({ register: 1 }).not.toExtend<Module>();
  });
});
