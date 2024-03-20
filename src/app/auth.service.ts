import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment'
const { URL_BASE_API, URL_BASE_LOGIN_API } = environment

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private authenticate = new BehaviorSubject<boolean>(false);

  getAuth(): boolean {
    let value = false;
    this.authenticate.subscribe(val => (value = val));
    return value;
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  setAuth(value: boolean,  token: string) {
    localStorage.setItem('token', token)
    this.authenticate.next(value);
  }

  logout(): void {
    localStorage.removeItem('token')
    this.authenticate.next(false);
  }

  loginApi(usuario: string, senha: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${URL_BASE_LOGIN_API}/seguranca/v1/Auth/Login`,
      {
        usuario,
        senha,
        sistema: "4",
        dominio: "UsuarioRobo",
        dispositivo: "web"
      },
      {
        observe: 'response',
      }
    );
  }


  pingAuth(): Observable<HttpResponse<any>> {
    return this.http.get<any>(
      `${URL_BASE_API}/betina-redis/ping`,
      {
        observe: 'response'
      }
    );
  }
}
