import { Component, input, output, signal } from '@angular/core';
import { TodoType } from '../../todos/todos';

@Component({
  selector: 'app-todo-item',
  imports: [],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css',
})
export class TodoItem {
  todo = input<TodoType>();
  toggle = output<void>();
  onDelete = output<void>();
  deleting = signal<boolean>(false);
  editing = signal<boolean>(false);

  toggleTodoComplete() {
    this.toggle.emit();
  }

  deleteTodo() {
    this.deleting.set(true);
    this.onDelete.emit();
  }

  edit() {
    this.editing.set(true);
  }
}
