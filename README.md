# filtered-package-names

Returns a subset of npm modules from npm registry which mathes a specified name pattern.

## Why?

Because maybe you want to do _something_ with a bunch of packages on npm. For example, you want to look at all `eslint-config-*` modules and see if they have appropriate keywords, or go through all `gulp-*` modules and run their package.json files through [nodesecurity.io](https://nodesecurity.io)'s [**nsp**](http://npm.im/nsp) to check for potentially vulnerable modules.

## Installation:

Currently this module isn't published to npm, so you'll need to install it from GitHub directly:

```sh
$ npm i pdehaan/filtered-package-names -S
```

## API:

Currently there is only one exposed method, `getPackagesByName()`, which has 3 parameters and returns a Promise:

```js
function getPackagesByName(filterRE, max=20, offset=0) {
  ..
}
```

- `filterRE`:RegularExpression &mdash; Regular expression to filter package names on. Required. Example: `/^eslint-config-/i`.
- `max`:Number &mdash; The maximum number of packages to return. Optional. Default: `20`.
- `offset`:Number &mdash; The record offset. This allows you to do paged results. Optional. Default `0`.

## Usage:

```js
const { getPackagesByName } = require('filtered-package-names');

const mapFunc = (pkg) => {
  return {
    name: pkg.name,
    version: pkg.version,
    keywords: pkg.keywords || [],
    repository: pkg.repository && pkg.repository.url || pkg.repository,
    dependencies: pkg.dependencies || {},
    devDependencies: pkg.devDependencies || {},
    peerDependencies: pkg.peerDependencies,
    _nsp: pkg.nsp
  };
};

getPackagesByName(/^eslint-config-/i, 2)
  .then((packages) => packages.map(mapFunc))
  .then((packages) => JSON.stringify(packages, null, 2))
  .then((output) => console.log(output))
  .catch((err) => console.error(err));
```

### Output:

```json
[
  {
    "name": "eslint-config-0x",
    "version": "0.1.0",
    "keywords": [
      "eslint",
      "config",
      "0+x"
    ],
    "repository": "git+https://github.com/zero-plus-x/eslint-config-0x.git",
    "dependencies": {},
    "devDependencies": {},
    "_nsp": {
      "data": [],
      "output": "(+) No known vulnerabilities found"
    }
  },
  {
    "name": "eslint-config-0x8890",
    "version": "1.0.2",
    "keywords": [],
    "repository": "git+ssh://git@github.com/0x8890/eslint-config-0x8890.git",
    "dependencies": {},
    "devDependencies": {},
    "_nsp": {
      "data": [],
      "output": "(+) No known vulnerabilities found"
    }
  }
]
```
