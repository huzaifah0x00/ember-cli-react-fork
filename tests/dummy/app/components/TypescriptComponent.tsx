import { withEmberHOC } from 'ember-cli-react';
import React from 'react';

interface IProps {
  name: string;
}

const SayHiWithTypescript = (props: IProps) => {
  return <span className="SayHi">Hello {props.name} from typescript</span>;
};

export default withEmberHOC(SayHiWithTypescript);
