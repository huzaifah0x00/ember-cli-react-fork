import React, { FunctionComponent } from 'react';

function ReactWrapperHOC(Component: any): typeof Component {
  function IdentifiableAsReactComponent(props: any) {
    return React.createElement(Component, props);
  }
  IdentifiableAsReactComponent.isEmberCliReactComponent = true;
  return IdentifiableAsReactComponent;
}

export function isWrappedWithHOC(componentObject: any): boolean {
  return componentObject?.isEmberCliReactComponent ?? false;
}

export default ReactWrapperHOC;
