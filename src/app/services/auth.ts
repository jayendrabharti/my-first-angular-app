import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import environment from '../../environments/environment';
import { firstValueFrom, Observable } from 'rxjs';
import { Router } from '@angular/router';

export interface UserData {
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  http = inject(HttpClient);
  router = inject(Router);
  userData = signal<UserData | null>(null);
  isLoggedIn = signal<boolean>(false);

  private refreshUrl = `${environment.apiBaseUrl}/api/auth/refresh`; //post
  private logoutUrl = `${environment.apiBaseUrl}/api/auth/logout`; //post
  private profileUrl = `${environment.apiBaseUrl}/api/user/profile`; //post,get
  private registerUrl = `${environment.apiBaseUrl}/api/auth/register`; // post
  private loginUrl = `${environment.apiBaseUrl}/api/auth/login`; // post

  constructor() {
    this.checkLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        this.http
          .get<any>(this.profileUrl, { withCredentials: true })
          .subscribe((res) => {
            this.userData.set({ name: res.data.name, email: res.data.email });
          });
      }
    });
  }

  async checkLoggedIn(): Promise<boolean> {
    const res = await firstValueFrom(
      this.http.get<any>(this.profileUrl, { withCredentials: true })
    );
    if (res.success) {
      this.isLoggedIn.set(true);
      return true;
    } else {
      return false;
    }
  }

  refreshAccessToken(): Observable<any> {
    return this.http.post(this.refreshUrl, {}, { withCredentials: true });
  }

  async signup(name: string, email: string, password: string): Promise<void> {
    this.http
      .post<any>(
        this.registerUrl,
        {
          name,
          email,
          password,
        },
        { withCredentials: true }
      )
      .subscribe(async (res) => {
        this.userData.set({
          name: res.data.user.name,
          email: res.data.user.email,
        });
        await this.checkLoggedIn();
        await this.router.navigate(['/']);
      });
  }

  async login(email: string, password: string): Promise<void> {
    this.http
      .post<any>(
        this.loginUrl,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .subscribe(async (res) => {
        this.userData.set({
          name: res.data.user.name,
          email: res.data.user.email,
        });
        await this.checkLoggedIn();
        await this.router.navigate(['/']);
      });
  }

  async logout(): Promise<void> {
    this.http
      .post(this.logoutUrl, {}, { withCredentials: true, observe: 'response' })
      .subscribe({
        next: async (response) => {
          if (response.ok) {
            this.userData.set(null);
            await this.checkLoggedIn();
            await this.router.navigate(['/login']);
          } else {
            alert('Logout failed!');
          }
        },
        error: (err) => {
          alert('Logout failed!');
          console.error('Logout error:', err);
        },
      });
  }

  updateUserName(newName: string): void {
    this.http
      .put<any>(
        this.profileUrl,
        {
          name: newName,
        },
        { withCredentials: true }
      )
      .subscribe((res) => {
        if (res?.success) {
          this.userData.update((u) => (u ? { ...u, name: newName } : null));
        }
      });
  }
}
