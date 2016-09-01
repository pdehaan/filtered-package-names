const { getPackagesByName } = require('./index');

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

getPackagesByName(/^eslint-config-/i, 5)
  .then((packages) => packages.map(mapFunc))
  .then((packages) => JSON.stringify(packages, null, 2))
  .then((output) => console.log(output))
  .catch((err) => console.error(err));
