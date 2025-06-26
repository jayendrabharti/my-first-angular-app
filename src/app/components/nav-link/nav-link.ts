import { Component, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  imports: [RouterLink],
  templateUrl: './nav-link.html',
  styleUrl: './nav-link.css',
})
export class NavLink {
  title = input<string>();
  path = input<string>();

  constructor(private router: Router) {}

  get isActive(): boolean {
    return this.router.url === this.path();
  }
}
