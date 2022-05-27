import React, { FunctionComponent } from 'react';
declare const ReactWrapperHOC: (Component: FunctionComponent) => {
    ({ ...props }: {
        [x: string]: any;
    }): React.FunctionComponentElement<{}>;
    isEmberCliReactComponent: boolean;
};
export declare function isWrappedWithHOC(componentObject: any): boolean;
export default ReactWrapperHOC;
//# sourceMappingURL=ReactWrapperHOC.d.ts.map