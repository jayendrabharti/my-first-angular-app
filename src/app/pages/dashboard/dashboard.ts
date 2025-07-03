import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth';
import { NavLink } from '../../components/nav-link/nav-link';

@Component({
  selector: 'app-dashboard',
  imports: [NavLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  auth = inject(Auth);
}
