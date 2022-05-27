import React from 'react';
import { ReactWrapperHOC } from 'ember-cli-react';

function TestReactComponent() {
  return <div id="test-react">React test</div>;
}

export default ReactWrapperHOC(TestReactComponent);
