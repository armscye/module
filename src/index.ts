/**
 * A self-contained unit of an application that registers its configuration,
 * such as providers, with the host application.
 *
 * What `register` returns is up to the application that loads the module,
 * which states it with the type parameter.
 *
 * @typeParam T - The configuration `register` returns. Defaults to
 * `unknown`, so a host must check the value before using it.
 *
 * @example
 * ```ts
 * import type { Provider } from '@armscye/container';
 * import type { Module } from '@armscye/module';
 *
 * interface AppModuleConfig {
 *   providers: Provider[];
 * }
 *
 * class AppModule implements Module<AppModuleConfig> {
 *   register(): AppModuleConfig {
 *     return {
 *       providers: [{ provide: 'appName', useValue: 'My App' }],
 *     };
 *   }
 * }
 * ```
 */
export interface Module<T = unknown> {
  /**
   * Returns the configuration this module contributes to the application.
   *
   * @returns The module's configuration.
   */
  register(): T;
}
