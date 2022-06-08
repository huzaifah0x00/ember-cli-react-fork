import React from 'react';
import { withEmberHOC } from 'ember-cli-react';

const SameNameDifferentCaseMixed = () => {
  return <span>My file name is "SameNameDifferentCaseMixed.jsx"</span>;
};

export default withEmberHOC(SameNameDifferentCaseMixed);
