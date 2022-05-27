import React from 'react';
import { ReactWrapperHOC } from 'ember-cli-react';

const TheWrapper = (props) => {
  return <span>Content: {props.children}</span>;
};

export default ReactWrapperHOC(TheWrapper);
