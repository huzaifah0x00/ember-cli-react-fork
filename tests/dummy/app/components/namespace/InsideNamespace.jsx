import React from 'react';
import { ReactWrapperHOC } from 'ember-cli-react';

const InsideNamespace = () => {
  return <span>I am inside a namespace!</span>;
};

export default ReactWrapperHOC(InsideNamespace);
