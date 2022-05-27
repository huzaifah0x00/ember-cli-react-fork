import { classify } from '@ember/string';
import Resolver from 'ember-resolver';
import ReactComponentWrapper from 'ember-cli-react/components/react-wrapper-component';
import * as ReactWrapperHOC from './ReactWrapperHOC';

interface PrasedName {
  fullName: string;
  fullNameWithoutType: string;
}

export default class ReactResolver extends Resolver {
  // `resolveComponent` is triggered when rendering a component in template.
  // For example, having `{{foo-bar}}` or <FooBar> in a template will trigger `resolveComponent`
  // with the name full name of `component:foo-bar`.

  resolveComponent(parsedName: PrasedName) {
    // First try to resolve with React-styled file name (e.g. SayHi).
    // If nothing is found, try again with original convention via `resolveOther`.
    // @ts-ignore // because ember-resolver doesn't provide types for Resolver class
    let result = this._resolveReactStyleFile(parsedName) || this.resolveOther(parsedName);

    // If there is no result found after all, return nothing
    if (!result) return;

    const isReactCompnent = ReactWrapperHOC.isWrappedWithHOC(result);
    if (isReactCompnent) {
      return ReactComponentWrapper.wrap(result);
    }

    return result;
  }

  // This resolver method attempt to find a file with React-style file name.
  // A React-style file name is in PascalCase.
  // This is made a private method to prevent creation of "react-style-file:*"
  // factory.
  _resolveReactStyleFile(parsedName: PrasedName) {
    const originalName = parsedName.fullNameWithoutType;

    // Convert the compnent name while preserving namespaces
    const parts = originalName.split('/');
    parts[parts.length - 1] = classify(parts[parts.length - 1]!);
    const newName = parts.join('/');

    const parsedNameWithPascalCase = Object.assign({}, parsedName, {
      fullNameWithoutType: newName,
    });
    // @ts-ignore // because ember-resolver doesn't provide types for Resolver class
    const result = this.resolveOther(parsedNameWithPascalCase);
    return result;
  }
}
