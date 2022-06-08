import React, { ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';

import Component from '@glimmer/component';

import { guidFor } from '@ember/object/internals';
import { tracked } from '@glimmer/tracking';
import { getOwner } from '@ember/application';

import YieldWrapper from './yield-wrapper';
import { _EmberOwnerContext } from '../hooks';

export default class ReactWrapperComponent extends Component {
  reactComponent?: () => JSX.Element;

  elementId = guidFor(this);
  @tracked blockChildren?: NodeList;

  get emberArgs() {
    // make this.args trackable?
    return { ...this.args };
  }

  onUpdate = (element: Element) => {
    this.didRender(element);
  };

  didRender = (element: Element) => {
    if (!this.reactComponent)
      throw new Error('reactComponent is not defined, did you forget to use .wrap?');

    const props: any = this.emberArgs;

    // Determine the children
    // If there is already `children` in `props`, we just pass it down (it can be function).
    // Otherwise we need to wrap the current `childNodes` inside a React component.
    // It is important that `childNodes` are reconstructed with `[...childNodes]` because
    // it is a `NodeList`-type object instead of Array in the first place.
    // Without reconstructing, `childNodes` will include the React component itself when
    // `componentDidMount` hook is triggerred.
    let children = props.children;
    if (!children && this.blockChildren?.length && this.blockChildren.length > 1) {
      children = [
        React.createElement(YieldWrapper, {
          key: this.elementId,
          nodes: [...this.blockChildren],
        }),
      ];
    }

    const reactElement = React.createElement(this.reactComponent, props, children);
    ReactDOM.render(this.wrapWithContextProvider(reactElement), element);
  };

  wrapWithContextProvider(component: ReactNode) {
    return React.createElement(_EmberOwnerContext.Provider, { value: getOwner(this) }, component);
  }

  onYieldBlockInserted = (element: Element) => {
    this.blockChildren = element.childNodes;
    element.remove();
  };

  onBlockUpdated = () => {
    alert('Unimplemented: onBlockUpdated... (ember-cli-react)');
  };

  willDestroyNode = (element: Element) => {
    ReactDOM.unmountComponentAtNode(element);
  };

  static wrap(reactComponent: () => JSX.Element) {
    // this is ( probably ) equivalent to the .extend({ reactComponent }) method for Ember component classes.
    // what this does is to create a new class that extends the current class... but overwrites the reactComponent property
    // I'm not sure if there is a better way to do this.
    return class Wrapper extends this {
      reactComponent = reactComponent;
    };
  }
}
