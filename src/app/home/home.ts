import { Component, signal } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  count = signal(0);

  increment() {
    this.count.update((value) => value + 1);
  }
  decrement() {
    this.count.update((value) => value - 1);
  }
  reset() {
    this.count.set(0);
  }
}
