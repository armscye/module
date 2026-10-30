import { describe, expectTypeOf, test } from 'vitest';
import type { Module } from './index.js';

interface Config {
  providers: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- 0.5.0 behaviour under test.
type AnyModule = Module<any>;

declare const mod: Module;
declare const typed: Module<Config>;
declare const untyped: AnyModule;

describe('Module', () => {
  test('register takes no arguments and returns unknown by default', () => {
    expectTypeOf<Module['register']>().parameters.toEqualTypeOf<[]>();
    expectTypeOf(mod.register()).toBeUnknown();
  });

  test('accepts every return type when T is omitted', () => {
    expectTypeOf({ register: () => ({ providers: [] }) }).toExtend<Module>();
    expectTypeOf({ register: () => 'config' }).toExtend<Module>();
    expectTypeOf({ register: () => undefined }).toExtend<Module>();
    expectTypeOf(
      class {
        register() {
          return {};
        }
      },
    ).instance.toExtend<Module>();
  });

  test('types what register returns with the type parameter', () => {
    expectTypeOf(typed.register()).toEqualTypeOf<Config>();
    expectTypeOf({
      register: () => ({ providers: ['a'] }),
    }).toExtend<Module<Config>>();
    expectTypeOf({
      register: () => ({ providers: 1 }),
    }).not.toExtend<Module<Config>>();
    expectTypeOf({
      register: () => Promise.resolve({ providers: ['a'] }),
    }).not.toExtend<Module<Config>>();
  });

  test('accepts a typed module where a plain Module is expected', () => {
    expectTypeOf(typed).toExtend<Module>();
    expectTypeOf([typed, mod]).toExtend<Module[]>();
  });

  test('keeps the 0.5.0 behaviour with Module<any>', () => {
    expectTypeOf(untyped.register()).toBeAny();
    expectTypeOf(mod).toExtend<AnyModule>();
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
