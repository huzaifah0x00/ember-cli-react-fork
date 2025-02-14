import React from 'react';
import { withEmberHOC } from 'ember-cli-react';

const NoYieldWrapperWithOwnChildren = props => {
  if (React.Children.count(props.children)) {
    throw new Error('There should be no child');
  }

  return (
    <span>
      <a>Link 1</a>
      <a>Link 2</a>
    </span>
  );
};

export default withEmberHOC(NoYieldWrapperWithOwnChildren);
