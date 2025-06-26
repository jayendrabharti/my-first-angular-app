import { Component, inject } from '@angular/core';
import { NavLink } from '../nav-link/nav-link';
import { Auth } from '../../services/auth';
import { UserButton } from '../user-button/user-button';

@Component({
  selector: 'app-header',
  imports: [NavLink, UserButton],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  auth = inject(Auth);
}
