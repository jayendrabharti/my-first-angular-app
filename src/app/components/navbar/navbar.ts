import { Component, inject } from '@angular/core';
import { NavLink } from '../nav-link/nav-link';
import { UserButton } from '../user-button/user-button';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [NavLink, UserButton],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  auth = inject(Auth);
}
