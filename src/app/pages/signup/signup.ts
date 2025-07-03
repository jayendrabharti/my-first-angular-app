import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private router = inject(Router);
  auth = inject(Auth);

  name = signal<string>('');
  email = signal<string>('');
  password = signal<string>('');
  confirmPassword = signal<string>('');
  validationErrorMessage = signal<string>('');

  handleSignup() {
    if (this.name().length < 3) {
      this.validationErrorMessage.set('Name should be at least 3 letters.');
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email())) {
      this.validationErrorMessage.set('Please enter a valid email address.');
      return;
    } else if (this.password() !== this.confirmPassword()) {
      this.validationErrorMessage.set('Passwords should be same.');
      return;
    }

    this.auth.signup(this.name(), this.email(), this.password());
    this.router.navigate(['/login']);
  }
}
