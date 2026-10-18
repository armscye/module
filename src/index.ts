/**
 * A self-contained unit of an application that registers its configuration,
 * such as providers, with the host application.
 *
 * What `register` returns is up to the application that loads the module.
 *
 * @example
 * ```ts
 * import type { Module } from '@armscye/module';
 *
 * class AppModule implements Module {
 *   register() {
 *     return {
 *       providers: [{ provide: 'appName', useValue: 'My App' }],
 *     };
 *   }
 * }
 * ```
 */
export interface Module {
  /**
   * Returns the configuration this module contributes to the application.
   *
   * @returns The module's configuration.
   */
  register(): any;
}
