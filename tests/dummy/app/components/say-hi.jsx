import React from 'react';
import { withEmberHOC } from 'ember-cli-react';

const SayHi = (props) => {
  return <span className="SayHi">Hello {props.name}</span>;
};

export default withEmberHOC(SayHi);
