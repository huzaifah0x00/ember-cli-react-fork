import React from 'react';
import { ReactWrapperHOC } from 'ember-cli-react';

const SameNameDifferentCaseMixed = () => {
  return <span>My file name is "SameNameDifferentCaseMixed.jsx"</span>;
};

export default ReactWrapperHOC(SameNameDifferentCaseMixed);
