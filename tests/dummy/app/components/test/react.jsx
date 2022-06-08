import React from 'react';
import { withEmberHOC } from 'ember-cli-react';

function TestReactComponent() {
  return <div id="test-react">React test</div>;
}

export default withEmberHOC(TestReactComponent);
