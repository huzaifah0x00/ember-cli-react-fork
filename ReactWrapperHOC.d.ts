import { ComponentType } from 'react';
declare function withEmberHOC<P>(Component: ComponentType<P>): typeof Component;
declare type IdentifiableComponentType = ComponentType & {
    isEmberCliReactComponent?: boolean;
};
export declare function isWrappedWithHOC(componentObject: IdentifiableComponentType): boolean;
export default withEmberHOC;
//# sourceMappingURL=ReactWrapperHOC.d.ts.map