import React from 'react';
import { withEmberHOC } from 'ember-cli-react';

function NoYieldWrapper(props) {
  if (React.Children.count(props.children)) {
    throw new Error('There should be no child');
  }

  return <span>Rendered correctly</span>;
}

export default withEmberHOC(NoYieldWrapper);
