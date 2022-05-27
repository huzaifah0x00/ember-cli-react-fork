import React, { ComponentType, FunctionComponent } from 'react';

function ReactWrapperHOC<P>(Component: ComponentType<P>): typeof Component {
  function IdentifiableReactComponent(props: P) {
    return React.createElement(Component, props);
  }
  IdentifiableReactComponent.isEmberCliReactComponent = true;
  return IdentifiableReactComponent;
}

type IdentifiableComponentType = ComponentType & { isEmberCliReactComponent?: boolean };

export function isWrappedWithHOC(componentObject: IdentifiableComponentType): boolean {
  return componentObject?.isEmberCliReactComponent ?? false;
}

export default ReactWrapperHOC;
