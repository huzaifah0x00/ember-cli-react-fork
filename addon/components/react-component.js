import React from 'react';
import ReactDOM from 'react-dom';

import Component from '@glimmer/component';

import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';

import YieldWrapper from './react-component/yield-wrapper';

export default class ReactComponentWrapper extends Component {
  reactComponent;

  elementId = guidFor(this);
  @tracked blockChildren = [];

  onUpdate = element => {
    console.log(
      'onUpdate called... should probably debug this if you see this message very often ( ember-cli-react )'
    );
    this.didRender(element);
  };

  didRender = element => {
    if (!this.reactComponent)
      throw new Error(
        'reactComponent is not defined, did you forget to use .wrap?'
      );

    const props = { ...this.args };

    // Determine the children
    // If there is already `children` in `props`, we just pass it down (it can be function).
    // Otherwise we need to wrap the current `childNodes` inside a React component.
    // It is important that `childNodes` are reconstructed with `[...childNodes]` because
    // it is a `NodeList`-type object instead of Array in the first place.
    // Without reconstructing, `childNodes` will include the React component itself when
    // `componentDidMount` hook is triggerred.
    let children = props.children;
    if (!children && this.blockChildren.length > 1) {
      children = [
        React.createElement(YieldWrapper, {
          key: this.elementId,
          nodes: [...this.blockChildren],
        }),
      ];
    }

    ReactDOM.render(
      React.createElement(this.reactComponent, { ...this.args }, children),
      element
    );
  };

  onYieldBlockInserted = element => {
    this.blockChildren = element.childNodes;
    element.remove();
  };

  onBlockUpdated = element => {
    alert('Unimplemented: onBlockUpdated... (ember-cli-react)');
  };

  willDestroyNode  = element => {
    ReactDOM.unmountComponentAtNode(element);
  };

  static wrap(reactComponent) {
    // this is ( probably ) equivalent to the .extend({ reactComponent }) method for Ember component classes.
    // what this does is to create a new class that extends the current class... but overwrites the reactComponent property
    // I'm not sure if there is a better way to do this.
    return class Wrapper extends this {
      reactComponent = reactComponent;
    };
  }
}
