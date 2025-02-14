import { classify } from '@ember/string';
import Resolver from 'ember-resolver';
import ReactComponentWrapper from 'ember-cli-react/components/react-wrapper-component';

export default class ReactResolver extends Resolver {
  // `resolveComponent` is triggered when rendering a component in template.
  // For example, having `{{foo-bar}}` or <FooBar> in a template will trigger `resolveComponent`
  // with the name full name of `component:foo-bar`.

  resolveComponent(parsedName) {
    // First try to resolve with React-styled file name (e.g. SayHi).
    // If nothing is found, try again with original convention via `resolveOther`.
    let result = this._resolveReactStyleFile(parsedName) || this.resolveOther(parsedName);

    // If there is no result found after all, return nothing
    if (!result) return;

    const isReactCompnent = this._isReactComponent(result);
    if (isReactCompnent) {
      return ReactComponentWrapper.wrap(result);
    }

    return result;
  }

  // This resolver method attempt to find a file with React-style file name.
  // A React-style file name is in PascalCase.
  // This is made a private method to prevent creation of "react-style-file:*"
  // factory.
  _resolveReactStyleFile(parsedName) {
    const originalName = parsedName.fullNameWithoutType;

    // Convert the compnent name while preserving namespaces
    const parts = originalName.split('/');
    parts[parts.length - 1] = classify(parts[parts.length - 1]);
    const newName = parts.join('/');

    const parsedNameWithPascalCase = Object.assign({}, parsedName, {
      fullNameWithoutType: newName,
    });
    const result = this.resolveOther(parsedNameWithPascalCase);
    return result;
  }

  _isClassComponent(component) {
    return typeof component === 'function' && !!component.prototype?.isReactComponent;
  }

  _isFunctionComponent(component) {
    // This check relies on the fact that the JSX is transpiled to
    // React.createElement(*) or _react *.createElement(*)
    if (typeof component === 'function') {
      const functionSourceCode = String(component);
      return /react.*\.createElement\(/gi.test(functionSourceCode);
    }
    return false;
  }

  _isReactComponent(component) {
    // https://stackoverflow.com/a/41658173
    return this._isClassComponent(component) || this._isFunctionComponent(component);
  }
}
