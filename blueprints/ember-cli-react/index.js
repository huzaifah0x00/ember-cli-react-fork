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

  normalizeEntityName: function () {},

  // Install react into host app
  afterInstall: async function () {
    const packages = [
      {
        name: 'react',
        target: getPeerDependencyVersion(pkg, 'react'),
      },
      {
        name: 'react-dom',
        target: getPeerDependencyVersion(pkg, 'react-dom'),
      },
      {
        name: '@ember/render-modifiers',
        target: getDependencyVersion(pkg, '@ember/render-modifiers'),
      },
    ];

    await this.addPackagesToProject(packages);

    let appFile = fs.readFileSync('app/app.js', 'utf8');
    if (appFile.includes('import Resolver from "ember-resolver"')) {
      appFile = appFile.replace(
        'import Resolver from "ember-resolver"',
        'import Resolver from "ember-cli-react/resolver"'
      );
      fs.writeFileSync('app/app.js', appFile);
    } else if (appFile.includes("import Resolver from 'ember-resolver'")) {
      appFile = appFile.replace(
        "import Resolver from 'ember-resolver'",
        "import Resolver from 'ember-cli-react/resolver'"
      );
      fs.writeFileSync('app/app.js', appFile);
    } else {
      console.warn(
        'ember-cli-react: app.js does not include Resolver. Please add the resolver manually.'
      );
      console.warn('( add import Resolver from "ember-cli-react/resolver" to app.js )');
    }
  },
};
