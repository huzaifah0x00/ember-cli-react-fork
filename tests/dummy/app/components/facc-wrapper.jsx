import React from 'react';
import { withEmberHOC } from 'ember-cli-react';

const FaccWrapper = props => {
  return <span>Warning: {props.children('supported but anti-pattern')}</span>;
};

export default withEmberHOC(FaccWrapper);
