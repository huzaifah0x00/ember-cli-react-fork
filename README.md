**Note:** This is a fork of https://github.com/pswai/ember-cli-react-fork due to its inactivity which was a fork of https://github.com/AltSchool/ember-cli-react due to its inactivity.
It uses the same addon name so it is almost a drop-in replacement.

the primary purpose of this addon is to enable tsx support, and update the resolver because it had trouble finding some ember components earlier.

# ember-cli-react-fork

[![Circle CI](https://circleci.com/gh/pswai/ember-cli-react-fork.svg?style=shield)](https://circleci.com/gh/pswai/ember-cli-react-fork)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Use clean React component hierarchies inside your Ember app.



## How does this work? What exactly is this addon doing to my Ember app?

The addon adds a custom [resolver](https://github.com/ember-cli/ember-resolver) (Simply put, A resolver is what is responsible for looking up the component definition in the component factory whenever the Ember App encounters a component in any .hbs file...) to your Ember App.

What this custom resolver does is enables you to:

1. use PascalCase filenames for component files ( this allows you to use the React convention of PascalCase filenames in Ember.js app ( which enforces kebab-case by default ) )
2. export React components ( functional or class-based ) from a component file and expect it to work without doing any extra steps...
3. This is done by checking if the resolved file exports a React component ( see [resolver.js](./addon/resolver.js) for more details ) and wrapping the exported React component with an  [Ember component (react-component.js)](./addon/components/react-component.js) this component calls ReactDOM.render in it's `didRender()` method and renders the original React Component onto the DOM, while passing all the props recieved through the hbs file to the actual React Component. see [react-component.js](./addon/components/react-component.js) for more details on how this is implemented.


## Install

Install the addon in your app:

```bash
yarn add --dev https://github.com/huzaifah0x00/ember-cli-react-fork
# OR
npm i -D https://github.com/huzaifah0x00/ember-cli-react-fork

# This triggers addon blueprint to do necessary setup
ember generate ember-cli-react
```

**NOTE**: `ember-cli-react` relies on a custom resolver to discover components.
If you have installed `ember-cli-react` with the standard way then you should be
fine. Otherwise, you will need to manually update the first line of
`app/resolver.js` to `import Resolver from 'ember-cli-react/resolver';`.

**NOTE:** the addon should update app.js automatically, but in case it doesn't... make sure your app.js uses the custom resolver (app/resolver.js) instead of the default 'ember-resolver' package

Then you should be good to go :)

</p>
</details>

## Usage

Write your React component as usual:

```jsx
// app/components/say-hi.jsx
import React from 'react';

const SayHi = props => <span>Hello {props.name}</span>;

export default SayHi;
```

Then render your component in a handlebars template:

```handlebars
{{say-hi name="Alex"}}
```

**NOTE**: Currently, `ember-cli-react` recognizes React components with `.jsx`
extension only.

## Block Form

Your React component can be used in block form to allow composition with
existing Ember or React components.

```handlebars
{{#react-panel}}
  {{ember-say-hi name="World!"}}
{{/react-panel}}
```

The children of `react-panel` will be populated to `props.children`.

Note that if the children contains mutating structure (e.g. `{{if}}`,
`{{each}}`), you need to wrap them in a stable tag to work around [this Glimmer
issue](https://github.com/yapplabs/ember-wormhole/issues/66#issuecomment-263575168).

```handlebars
{{#react-panel}}
  <div>
    {{#if isComing}}
      {{ember-say-hi name="World!"}}
    {{else}}
      See ya!
    {{/if}}
  </div>
{{/react-panel}}
```

Although this is possible, block form should be used as a tool to migrate Ember
to React without the hard requirement to start with leaf components. It is
highly recommended to have clean React component tree whenever possible for best
performance.

## PascalCase File Naming

You can name your React component files using either the Ember convention of
[`kebab-case`](https://ember-cli.com/naming-conventions) or the React convention
of [`PascalCase`](https://github.com/airbnb/javascript/tree/master/react#naming)
.

```handlebars
{{!-- Both `user-avatar.jsx` and `UserAvatar.jsx` work --}}
{{user-avatar}}
```

Referencing your React components with `PascalCase` in handlebars is also
supported when invoked using `react-component`.

```handlebars
{{!-- OK! --}}
{{react-component "user-avatar"}}

{{!-- OK! --}}
{{react-component "UserAvatar"}}

{{!-- Single worded components are OK too! --}}
{{react-component "Avatar"}}
```

### React Components are Prioritized

Whenever there is a conflict, component files with React-style convention will
be used.

Examples:

- When both `SameName.jsx` and `same-name.jsx` exist, `SameName.jsx` will be
  used
- When both `SameName.jsx` and `same-name.js` (Ember) exist, `SameName.jsx`
  will be used

#### Known issue

If an Ember component and a React component has exactly the same name but
different extension (`same-name.js` and `same-name.jsx`), the file with `.js`
extension will be overwritten with the output of `same-name.jsx`. We are still
looking at ways to resolve this.

## A More Complete Example

A more complete example which demonstrates data binding and how to handle
actions from within React components.

#### app/templates/application.hbs

```handlebars
{{todo-list
  onToggle=(action onToggle)
  todos=model
}}

Completed {{completedTodos.length}} todos
```

#### app/components/todo-list.jsx

```jsx
import React from 'react';
import TodoItem from './todo-item';

export default function(props) {
  return (
    <ul>
      {props.todos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} onToggle={props.onToggle} />;
      })}
    </ul>
  );
}
```

#### app/components/todo-item.jsx

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

export default class TodoItem extends React.Component {
  render() {
    let todo = this.props.todo;

    return (
      <li>
        <input
          type="checkbox"
          checked={todo.isComplete}
          onChange={this.props.onToggle.bind(null, todo.id)}
        />
        <span>{todo.text}</span>
      </li>
    );
  }
}
```

## What's Missing

There is no React `link-to` equivalent for linking to Ember routes inside of
your React code. Instead pass action handlers that call `transitionTo` from an
Ember route or component.

In order to create minified production builds of React you must set
`NODE_ENV=production`.

## 
