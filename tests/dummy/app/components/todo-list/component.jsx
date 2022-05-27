import React from 'react';
import TodoItem from './todo-item';
import { ReactWrapperHOC } from 'ember-cli-react';

const TodoList = (props) => {
  return (
    <ul>
      {props.todos.map((todo) => {
        return <TodoItem key={todo.id} todo={todo} onToggle={props.onToggle} />;
      })}
    </ul>
  );
};

export default ReactWrapperHOC(TodoList);
