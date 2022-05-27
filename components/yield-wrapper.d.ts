import React from 'react';
/**
 * A React component that is used to render HTML Nodes.
 *
 * The primary usage of this component is to support `props.children` in `react-wrapper-component`.
 * The catch is that if the children is unstable, they need to be wrapped in a stable tag
 * (e.g. div) to make Glimmer happy.
 * See: https://github.com/yapplabs/ember-wormhole/issues/66#issuecomment-263575168
 *
 * Note that although this is possible, it should be used as a tool to migrate Ember to React
 * without the hard requirement to start with leaf components. It is highly recommended to
 * have clean React component tree whenever possible.
 *
 * Integration guide: https://reactjs.org/docs/integrating-with-other-libraries.html
 */
export default function YieldWrapper(props: {
    nodes: Node[];
}): React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
//# sourceMappingURL=yield-wrapper.d.ts.map