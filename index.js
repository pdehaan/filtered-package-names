const ALL_MODULES = require('all-the-package-names');
const nsp = require('nsp-check-remote');

exports.getPackagesByName = (filterRE, max=20, offset=0) => {
  return Promise.resolve(ALL_MODULES)
    // Filter modules by name.
    .then((modules) => modules.filter((name) => filterRE.test(name)))
    // Avoid flooding the server by working in batches.
    .then((modules) => modules.splice(offset, max))
    // Get the module's package.json and validate against nsp.
    .then((modules) => Promise.all(modules.map(getNspPackage)));
};

function getNspPackage(name) {
  return nsp.checkLatest(name, 'summary')
    .then(({data, output, package}) => Object.assign(package, {
      nsp: {
        data,
        output
      }
    }));
}
