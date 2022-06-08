import React from 'react';
import { withEmberHOC } from 'ember-cli-react';

const TheWrapper = (props) => {
  return <span>Content: {props.children}</span>;
};

export default withEmberHOC(TheWrapper);
