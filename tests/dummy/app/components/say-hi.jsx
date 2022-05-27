import React from 'react';
import { ReactWrapperHOC } from 'ember-cli-react';

const SayHi = (props) => {
  return <span className="SayHi">Hello {props.name}</span>;
};

export default ReactWrapperHOC(SayHi);
