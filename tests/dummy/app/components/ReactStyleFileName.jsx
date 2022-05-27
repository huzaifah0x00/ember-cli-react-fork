import React from 'react';
import { ReactWrapperHOC } from 'ember-cli-react';

const ReactStyleFileName = () => {
  return <span>My file name is ReactStyleFileName</span>;
};

export default ReactWrapperHOC(ReactStyleFileName);
