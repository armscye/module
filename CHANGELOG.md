# Changelog

## [0.6.0](https://github.com/armscye/module/compare/v0.5.0...v0.6.0) (2026-10-30)

### ⚠ BREAKING CHANGES

* register() now returns unknown unless Module is given a
  type argument. Use Module<Config> to type it, or Module<any> to keep the
  0.5.0 behaviour.

### Features

* make Module generic over the register() return type ([e0fc2f1](https://github.com/armscye/module/commit/e0fc2f1165a8b30ac3f0c57ddebbdab49276df15))

## 0.5.0 (2026-10-18)

### ⚠ BREAKING CHANGES

* the package is ESM-only with an exports map, so deep
  imports such as @armscye/module/dist/module no longer resolve, and it
  requires Node.js 22.12 or later. CommonJS consumers need the
  resolution-mode import attribute or "module": "nodenext".

### Features

* publish as a standalone ESM package ([406a76e](https://github.com/armscye/module/commit/406a76e8438aec17b3f09b54b41b83689909b326))
