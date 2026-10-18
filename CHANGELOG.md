# Changelog

## 0.5.0 (2026-10-18)

### ⚠ BREAKING CHANGES

* the package is ESM-only with an exports map, so deep
  imports such as @armscye/module/dist/module no longer resolve, and it
  requires Node.js 22.12 or later. CommonJS consumers need the
  resolution-mode import attribute or "module": "nodenext".

### Features

* publish as a standalone ESM package ([406a76e](https://github.com/armscye/module/commit/406a76e8438aec17b3f09b54b41b83689909b326))
