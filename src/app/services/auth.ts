import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

export interface UserData {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);
  userData = signal<UserData | null>(null);

  constructor() {
    this.http
      .get<UserData>(`http://localhost:3000/auth/user`, {
        withCredentials: true,
      })
      .subscribe((data) => {
        this.userData.set({ name: data.name, email: data.email });
      });
  }

  signup(name: string, email: string, password: string): void {
    this.http
      .post(
        `http://localhost:3000/auth/signup`,
        {
          name,
          email,
          password,
        },
        {
          observe: 'response',
        }
      )
      .subscribe((response) => {
        if (response.ok) {
          alert('User Signed Up Successfully');
        } else {
          alert('User Sign Up failed !!');
        }
      });
  }

  login(email: string, password: string): void {
    const user = { email, password };
    this.http
      .post<{ accessToken: string; user: UserData }>(
        `http://localhost:3000/auth/login`,
        user,
        { withCredentials: true }
      )
      .subscribe((data) => {
        this.userData.set({ name: data.user.name, email: data.user.email });
      });
  }

  logout(): void {
    this.userData.set(null);
    localStorage.removeItem('accessToken');
    this.http
      .post('http://localhost:3000/auth/logout', {}, { withCredentials: true })
      .subscribe();
  }

  updateUserName(newName: string): void {
    this.http
      .put(
        'http://localhost:3000/auth/update',
        {
          name: newName,
        },
        {
          withCredentials: true,
          observe: 'response',
        }
      )
      .subscribe((data) => {
        if (data.ok) {
          this.userData.update((u) => (u ? { ...u, name: newName } : null));
        }
      });
  }
}
