import React from 'react';
import { useEmberService } from 'ember-cli-react';

export default function ComponentUsingEmberService() {
  const testService = useEmberService('test');
  return <p>{testService.getText()}</p>;
}
