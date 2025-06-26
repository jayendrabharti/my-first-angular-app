import { Component, inject, signal } from '@angular/core';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-button',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-button.html',
  styleUrl: './user-button.css',
})
export class UserButton {
  auth = inject(Auth);
  openDropdown = signal<boolean>(false);

  toggleDropdown(): void {
    this.openDropdown.update((p) => !p);
  }
}
