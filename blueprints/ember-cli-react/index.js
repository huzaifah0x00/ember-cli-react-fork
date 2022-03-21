var pkg = require('../../package.json');
const fs = require('fs');

function getDependencyVersion(packageJson, name) {
  var dependencies = packageJson.dependencies;
  var devDependencies = packageJson.devDependencies;

  return dependencies[name] || devDependencies[name];
}

function getPeerDependencyVersion(packageJson, name) {
  var peerDependencies = packageJson.peerDependencies;

  return peerDependencies[name];
}

module.exports = {
  description: 'Install ember-cli-react dependencies into your app.',

  normalizeEntityName: function() {},

  // Install react into host app
  afterInstall: async function() {
    const packages = [
      {
        name: 'ember-auto-import',
        target: getDependencyVersion(pkg, 'ember-auto-import'),
      },
      {
        name: 'react',
        target: getPeerDependencyVersion(pkg, 'react'),
      },
      {
        name: 'react-dom',
        target: getPeerDependencyVersion(pkg, 'react-dom'),
      },
      {
        name: '@types/react-dom',
        target: getPeerDependencyVersion(pkg, '@types/react-dom'),
      },
      {
        name: '@types/react',
        target: getPeerDependencyVersion(pkg, '@types/react'),
      },
    ];
    await this.addPackagesToProject(packages);
    let appFile = fs.readFileSync('app/app.js', 'utf8');
    const updatedAppFile = appFile.replace(
      'import Resolver from "ember-resolver";',
      'import Resolver from "ember-cli-react/resolver";'
    );

    if (updatedAppFile !== appFile) {
      fs.writeFileSync('app/app.js', updatedAppFile);
    } else {
      console.warn(
        `Could not update app.js. Please manually add the following to app.js:\nimport Resolver from './resolver';`
      );
    }
  },
};
