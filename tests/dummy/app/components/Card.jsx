import React from 'react';
import { ReactWrapperHOC } from 'ember-cli-react';

const Card = () => {
  return <span>I am a Card component, I have no dash!</span>;
};

export default ReactWrapperHOC(Card);
