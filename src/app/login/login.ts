import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  auth = inject(Auth);
  email = signal<string>('');
  password = signal<string>('');
  handleLogin() {
    this.auth.login(this.email(), this.password());
  }
}
