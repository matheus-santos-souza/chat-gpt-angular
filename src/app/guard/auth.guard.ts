import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (this.authService.getToken()) {
      this.authService.pingAuth()
      .subscribe({
        next: response => {
          const resposta = response.body
          if(resposta.ping === 'PONG') {
            this.authService.setAuth(true, this.authService.getToken() || '')
          } else {
            this.authService.logout()
            this.snackBar.open('Não autorizado!', 'OK', {
              duration: 4000,
            });
            this.router.navigateByUrl('login')
          }
        },
        error: error => {
          this.authService.logout()
          this.snackBar.open('Seu login expirou! Faça o login novamente!', 'OK', {
            duration: 4000,
          });
          this.router.navigateByUrl('login')
        },
      });  
    } else {
      this.router.navigateByUrl('login')
    }
    return true
  }
}
