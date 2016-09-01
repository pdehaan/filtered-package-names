# filtered-package-names

Returns a subset of npm modules from npm registry which mathes a specified name pattern.

## Installation:

```sh
$ npm i pdehaan/filtered-package-names -S
```

## API:

Currently there is only one exposed method, `getPackagesByName()`, which has 3 paramters and returns a Promise:

- `filterRE`:RegularExpression &mdash; Regular expression to filter package names on. Example: `/^eslint-config-/i`.
- `max`:Number &mdash; The maximum number of packages to return. Default: `20`.
- `offset`:Number &mdash; The record offset. This allows you to do paged results. Default `0`.

```js
function getPackagesByName(filterRE, max=20, offset=0) {
  ..
}
```

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


