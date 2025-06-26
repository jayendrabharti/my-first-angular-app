import { HttpClient } from '@angular/common/http';
import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-todo',
  imports: [FormsModule],
  templateUrl: './new-todo.html',
  styleUrl: './new-todo.css',
})
export class NewTodo {
  http = inject(HttpClient);
  adding = signal<boolean>(false);
  title = signal<string>('');
  description = signal<string>('');
  onAddTodo = output<void>();

  add() {
    this.http
      .post(
        'http://localhost:3000/todos',
        {
          title: this.title(),
          description: this.description(),
        },
        {
          withCredentials: true,
        }
      )
      .subscribe(() => {
        this.adding.set(false);
        this.title.set('');
        this.description.set('');
        this.onAddTodo.emit();
      });
  }
}
