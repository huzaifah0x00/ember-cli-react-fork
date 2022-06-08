import React from 'react';
import { withEmberHOC } from 'ember-cli-react';

const FancyButton = props => {
  return (
    <button className="FancyButton" onClick={props.onClick}>
      Click
    </button>
  );
};

export default withEmberHOC(FancyButton);
