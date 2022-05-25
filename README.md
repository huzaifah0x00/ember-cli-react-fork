**Note:** This is a fork of https://github.com/pswai/ember-cli-react-fork due to its inactivity which was a fork of https://github.com/AltSchool/ember-cli-react due to its inactivity.

It uses the same addon name (as ember-cli-react) so it is almost a drop-in replacement. ( Unless you're using the syntax to invoke react-component directly ( {{ react-component "ReactComponentName" }} ), this was removed from this fork. )

the primary purpose of this fork is to [enable tsx support](https://github.com/huzaifah0x00/ember-cli-react-fork/commit/80a4907bd49730a604dcce6e89c261e3fbf80435), and update the resolver because it had [trouble finding some ember components](https://github.com/huzaifah0x00/ember-cli-react-fork/commit/0c10fbd239725ac44562e1112ffa84770ab9da80).

# ember-cli-react-fork

![Github CI](https://github.com/huzaifah0x00/ember-cli-react-fork/actions/workflows/ci.yml/badge.svg)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Use clean React component hierarchies inside your Ember app.



## How does this work? What exactly is this addon doing to my Ember app?

The addon adds a custom [resolver](https://github.com/ember-cli/ember-resolver) to your Ember App ( A resolver is what is responsible for looking up the component definition in the component factory whenever the Ember App encounters a component in any .hbs file...) .

What this custom resolver does is enables you to:

1. use PascalCase filenames for component files ( this allows you to use the React convention of PascalCase filenames in Ember.js app ( which otherwise enforces kebab-case by default ) )

2. export React components ( functional or class-based ) from a component file and expect it to work without doing any extra steps...

   This is done by checking if the resolved file exports a React component ( see [resolver.js](./addon/resolver.js) for more details ) and wrapping the exported React component with an  [Ember component (react-wrapper-component.js)](./addon/components/react-wrapper-component.js). This component calls ReactDOM.render in it's `didRender()` method and renders the original React Component onto the DOM, while passing all the props recieved through the hbs file to the actual React Component. see [react-wrapper-component.js](./addon/components/react-wrapper-component.js) for more details on how this is implemented.


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

**NOTE:** the addon should update app.js automatically, but in case it doesn't... make sure your app.js uses the custom resolver (app/resolver.js) instead of the default 'ember-resolver' package.

**NOTE:** You might also need to add a `"jsx": "react"` flag in your project's tsconfig.json or jsconfig.json file.

Then you should be good to go :)

# Usage

Write your React component as usual ( you can use both .tsx or .jsx ):

```jsx
// app/components/say-hi.tsx
import React from 'react';

const SayHi = props => <span>Hello {props.name}</span>;

export default SayHi;
```

Then render your component in a handlebars template:

```handlebars
<SayHi @name="Alex" />

<!-- you can also use the old syntax -->
{{say-hi name="Alex"}}
```

## Block Form

Your React component can be used in block form to allow composition with
existing Ember or React components.

```handlebars
<ReactPanel>
	<EmberSayHi @name="World!" />
</ReactPanel>
```

The children of `react-panel` will be populated to `props.children`.

Note that if the children contains mutating structure (e.g. `{{if}}`,
`{{each}}`), you need to wrap them in a stable tag to work around [this Glimmer
issue](https://github.com/yapplabs/ember-wormhole/issues/66#issuecomment-263575168).

```handlebars
<ReactPanel>
  <div>
    {{#if isComing}}
		<EmberSayHi @name="World!" />
    {{else}}
		See ya!
    {{/if}}
  </div>
</ReactPanel>
```

Although this is possible, block form should be used as a tool to migrate Ember
to React without the hard requirement to start with leaf components. It is
highly recommended to have clean React component tree whenever possible for best
performance.

## PascalCase File Naming

You can name your React component files using either the Ember convention of
[`kebab-case`](https://ember-cli.com/naming-conventions) or the React convention of [`PascalCase`](https://github.com/airbnb/javascript/tree/master/react#naming).

```handlebars
{{!-- Both `user-avatar.jsx` and `UserAvatar.jsx` work --}}
{{UserAvatar}}
```

You can use either the newer Octane syntax or the old syntax for referencing react components, both ways work.

```handlebars
{{!-- OK! --}}
{{user-avatar}}

{{!-- OK! --}}
<UserAvatar />

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
<TodoList
  @onToggle={{this.onToggle}}
  @todos={{model}}
/>

Completed {{this.completedTodos.length}} todos
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

## Accessing Ember services from react
You can use the useEmberService hook to lookup services defined in the Ember application.

```jsx
import React from 'react';
import { useEmberService } from 'ember-cli-react';

export default function HelloService () {
  const doSomething = () => {
    const alertService = useEmberService('alert-service');
    alertService.showAlert("yay, service works... when called from react");
  }

  return (
    <button onClick={doSomething} />
  );
}
```

## What's Missing

There is no React `link-to` equivalent for linking to Ember routes inside of
your React code. Instead pass action handlers that call `transitionTo` from an
Ember route or component.

In order to create minified production builds of React you must set
`NODE_ENV=production`.

