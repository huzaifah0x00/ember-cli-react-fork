var pkg = require('../../package.json');
const fs = require('fs');

module.exports = {
  description: 'Install ember-cli-react dependencies into your app.',

  normalizeEntityName: function () {},

  // Install react into host app
  afterInstall: async function () {
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
