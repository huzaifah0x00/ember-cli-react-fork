import React, { ReactNode } from 'react';
import Component from '@glimmer/component';
export default class ReactWrapperComponent extends Component {
    reactComponent?: () => JSX.Element;
    elementId: string;
    blockChildren?: NodeList;
    get emberArgs(): {};
    onUpdate: (element: any) => void;
    didRender: (element: Element) => void;
    wrapWithContextProvider(component: ReactNode): React.FunctionComponentElement<React.ProviderProps<any>>;
    onYieldBlockInserted: (element: Element) => void;
    onBlockUpdated: () => void;
    willDestroyNode: (element: Element) => void;
    static wrap(reactComponent: () => JSX.Element): {
        new (owner: unknown, args: {}): {
            reactComponent: () => JSX.Element;
            elementId: string;
            blockChildren?: NodeList | undefined;
            readonly emberArgs: {};
            onUpdate: (element: any) => void;
            didRender: (element: Element) => void;
            wrapWithContextProvider(component: React.ReactNode): React.FunctionComponentElement<React.ProviderProps<any>>;
            onYieldBlockInserted: (element: Element) => void;
            onBlockUpdated: () => void;
            willDestroyNode: (element: Element) => void;
            args: {};
            readonly debugName: string;
            didInsertElement(): void;
            didUpdate(): void;
            bounds: import("@glimmer/component/dist/types/src/component").Bounds;
            readonly element: HTMLElement;
            readonly isDestroying: boolean;
            readonly isDestroyed: boolean;
            willDestroy(): void;
        };
        wrap(reactComponent: () => JSX.Element): any;
    };
}
//# sourceMappingURL=react-wrapper-component.d.ts.map