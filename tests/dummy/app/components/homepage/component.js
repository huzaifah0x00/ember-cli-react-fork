import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class Homepage extends Component {
  @tracked
  todos = [
    { id: 1, text: 'Buy groceries', isComplete: false },
    { id: 2, text: 'Go to the gym', isComplete: false },
    { id: 3, text: 'Read that book', isComplete: false },
    { id: 4, text: 'Get glasses fixed', isComplete: false },
  ];

  get completedTodos() {
    return this.todos.filter((todo) => todo.isComplete);
  }

  onToggle = (todoId) => {
    let todos = this.todos.map((todo) => {
      if (todo.id === todoId) {
        todo.isComplete = !todo.isComplete;
      }

      return todo;
    });

    this.todos = todos;
  };

  resetAll = () => {
    const updated = this.todos.map((todo) => {
      todo.isComplete = false;
      return todo;
    });

    this.todos = updated;
  };
}
