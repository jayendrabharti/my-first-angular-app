import { Component, inject, signal } from '@angular/core';
import { Auth } from '../services/auth';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account',
  imports: [RouterLink, FormsModule],
  templateUrl: './account.html',
  styleUrl: './account.css',
})
export class Account {
  auth = inject(Auth);
  updateNameModelOpen = signal<boolean>(false);
  newName = signal<string>('');

  abortNameUpdate(): void {
    this.updateNameModelOpen.set(false);
    this.newName.set('');
  }

  updateName(): void {
    if (this.newName().length < 3) {
      alert('Name must be atleast 3 letters.');
      return;
    }
    this.auth.updateUserName(this.newName());
    this.updateNameModelOpen.set(false);
  }
}
