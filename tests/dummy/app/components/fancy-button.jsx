import React from 'react';
import { ReactWrapperHOC } from 'ember-cli-react';

const FancyButton = props => {
  return (
    <button className="FancyButton" onClick={props.onClick}>
      Click
    </button>
  );
};

export default ReactWrapperHOC(FancyButton);
