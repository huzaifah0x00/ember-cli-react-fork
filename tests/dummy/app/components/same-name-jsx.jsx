import React from 'react';
import { ReactWrapperHOC } from 'ember-cli-react';

const SameNameJsxWithSnakeCase = () => {
  return <span>My file name is "same-name-jsx.jsx"</span>;
};

export default ReactWrapperHOC(SameNameJsxWithSnakeCase);
