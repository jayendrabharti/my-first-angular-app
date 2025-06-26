import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { TodoItem } from '../components/todo-item/todo-item';
import { NewTodo } from '../components/new-todo/new-todo';

export type TodoType = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

@Component({
  selector: 'app-todos',
  imports: [TodoItem, NewTodo],
  templateUrl: './todos.html',
  styleUrl: './todos.css',
})
export class Todos {
  http = inject(HttpClient);
  loading = signal<boolean>(true);
  todos = signal<TodoType[]>([]);

  constructor() {
    this.getTodos();
  }

  getTodos() {
    this.http
      .get<TodoType[]>('http://localhost:3000/todos', {
        withCredentials: true,
      })
      .subscribe((data) => {
        this.todos.set(data);
        this.loading.set(false);
      });
  }

  toggleComplete(id: string) {
    const todo = this.todos().find((todo) => todo._id === id);
    this.http
      .put(
        `http://localhost:3000/todos/${id}`,
        {
          completed: !todo?.completed,
        },
        { withCredentials: true }
      )
      .subscribe(() => {
        this.getTodos();
      });
  }

  deleteTodo(id: string) {
    this.http
      .delete(`http://localhost:3000/todos/${id}`, { withCredentials: true })
      .subscribe(() => {
        this.getTodos();
      });
  }
}
