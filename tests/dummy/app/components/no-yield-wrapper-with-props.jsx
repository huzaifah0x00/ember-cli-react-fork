import React from 'react';
import { withEmberHOC } from 'ember-cli-react';

const NoYieldWrapperWithProps = props => {
  const { text, children } = props;

  if (React.Children.count(children)) {
    throw new Error('There should be no child');
  }

  return <span>Rendered correctly with "{text}"</span>;
};

export default withEmberHOC(NoYieldWrapperWithProps);
