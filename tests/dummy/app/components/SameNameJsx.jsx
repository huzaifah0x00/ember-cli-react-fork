import React from 'react';
import { withEmberHOC } from 'ember-cli-react';

const SameNameJsxWithPascalCase = () => {
  return <span>My file name is "SameNameJsx.jsx"</span>;
};

export default withEmberHOC(SameNameJsxWithPascalCase);
