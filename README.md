# @armscye/module

> Common TypeScript types for application modules.

## Install

```sh
npm install --save-dev @armscye/module
# or
yarn add --dev @armscye/module
# or
pnpm add -D @armscye/module
```

Import with `import type { … }` so the import is erased from your build.

Requires Node.js 22.12 or later.

The package is ESM only. In a CommonJS file compiled with
`"module": "node16"`, add the `resolution-mode` attribute; with
`"module": "nodenext"` (TypeScript 5.8+) the plain form works.

```ts
import type { Module } from '@armscye/module' with {
  'resolution-mode': 'import',
};
```

> [!NOTE]
> Install it as a regular dependency instead if your package publishes
> `.d.ts` files that reference these types, or if you use inline
> `import { type … }` with `verbatimModuleSyntax`, which keeps an
> `import {} from '@armscye/module'` at runtime.

## Usage

```ts
import type { Module } from '@armscye/module';
```

| Type        | Describes                                              |
| ----------- | ------------------------------------------------------ |
| `Module<T>` | `register()`, which returns the module's configuration |

What `register` returns is up to the application that loads the module. The
type parameter `T` states it and defaults to `unknown`, so a host must check
the value before using it.

A module typically returns the providers it contributes. With a type
argument, `implements` checks that `register` returns that shape:

```ts
import type { Provider } from '@armscye/container';

interface AppModuleConfig {
  providers: Provider[];
}

class AppModule implements Module<AppModuleConfig> {
  register(): AppModuleConfig {
    return {
      providers: [{ provide: 'appName', useValue: 'My App' }],
    };
  }
}
```

A host that loads many modules names the keys it reads. Modules that return
extra keys still fit:

```ts
function bootstrap(modules: Module<{ providers: Provider[] }>[]): Provider[] {
  return modules.flatMap((m) => m.register().providers);
}
```

`Module<any>` keeps the untyped behaviour of 0.5.0 and earlier.

## Contributing

Develop on the Node.js version in `.nvmrc` (`nvm use`, currently 24) and
pnpm via Corepack or a global install matching `packageManager` in
`package.json`. CI type-checks, tests and builds on Node.js 22.12, the
oldest version the package supports, and on 24 and 26. Lint and
formatting run once, on the `.nvmrc` version.

```sh
pnpm install     # also installs the Git hooks
pnpm lint        # ESLint (type-checked rules + JSDoc)
pnpm typecheck   # tsc --noEmit
pnpm test        # Vitest type tests (src/**/*.test-d.ts)
pnpm build       # emit dist/
pnpm format      # Prettier
```

| Script              | What it does                                |
| ------------------- | ------------------------------------------- |
| `build`             | Cleans and compiles `src/` to `dist/`       |
| `clean`             | Removes `dist/`                             |
| `typecheck`         | Type-checks sources, tests and config files |
| `lint`              | Runs ESLint                                 |
| `lint:fix`          | Runs ESLint and fixes what it can           |
| `format`            | Formats every file with Prettier            |
| `format:check`      | Fails if any file is not formatted          |
| `test`              | Runs the type tests                         |
| `check:package`     | Builds, then runs publint and attw          |
| `release`           | Cuts a release with release-it              |
| `prepack`           | Builds before `npm pack` or `npm publish`   |
| `renovate:validate` | Validates `renovate.json` (Node.js 24.11+)  |
| `prepare`           | Installs the Husky Git hooks                |

Every exported declaration needs JSDoc with a description; exported
interfaces and type aliases also need an `@example`.

### Commit conventions

Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
and are checked by commitlint in the `commit-msg` hook. The `pre-commit` hook
runs ESLint and Prettier on staged files.

```text
feat: add ModuleOptions type       → minor release
fix: correct Module JSDoc          → patch release
feat!: drop Node.js 20 support     → major release
docs: clarify usage                → no version bump on its own
chore(deps): update vitest to v5   → no version bump on its own
```

Until 1.0.0 every bump is one level lower (`preMajor` in
`.release-it.json`): a breaking change is a minor release and a `feat` is a
patch release.

Renovate opens its PRs as `chore(deps): …`, so dependency updates never
appear in the changelog.

## License

This project is licensed under the **MIT license**.

See [LICENSE](./LICENSE) for more information.
