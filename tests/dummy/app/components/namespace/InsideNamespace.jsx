import React from 'react';
import { withEmberHOC } from 'ember-cli-react';

const InsideNamespace = () => {
  return <span>I am inside a namespace!</span>;
};

export default withEmberHOC(InsideNamespace);
