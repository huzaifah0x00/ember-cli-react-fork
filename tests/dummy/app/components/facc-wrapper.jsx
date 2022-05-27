import React from 'react';
import { ReactWrapperHOC } from 'ember-cli-react';

const FaccWrapper = props => {
  return <span>Warning: {props.children('supported but anti-pattern')}</span>;
};

export default ReactWrapperHOC(FaccWrapper);
