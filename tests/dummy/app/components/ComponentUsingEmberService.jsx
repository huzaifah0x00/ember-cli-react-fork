import React from 'react';
import { useEmberService, ReactWrapperHOC } from 'ember-cli-react';

function ComponentUsingEmberService() {
  const testService = useEmberService('test');
  return <p>{testService.getText()}</p>;
}

export default ReactWrapperHOC(ComponentUsingEmberService);
