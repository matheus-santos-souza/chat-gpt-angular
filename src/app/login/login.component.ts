import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
  hideConfirmar = true;
  hideNova = true;
  hide = true;

  loading: boolean = false;
  formLogin!: FormGroup;

  @Input() authenticate: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar, 
    private router: Router,
    private authService: AuthService
  ) {
    this.formLogin = this.formBuilder.group({
      user: ['', Validators.required],
      senha: ['', [Validators.required]],
    });
  }

  entrar(): void {
    this.loading = true;
    this.formLogin.markAllAsTouched();
    if (this.formLogin?.valid) {
      const user = this.formLogin.get('user')?.value
      const senha = this.formLogin.get('senha')?.value
      this.authService.loginApi(user, senha)
      .subscribe({
        next: response => {
          const resposta = response.body
          if(resposta?.authenticated) {
            console.log(resposta)
            this.authService.setAuth(true, resposta.accessToken)
            this.router.navigateByUrl('perguntar')
          } else {
            this.snackBar.open(
              `Usuário ou senha inválidos!`,
              '',
              { duration: 6000 }
            );
          }
        },
        error: error => {
          this.snackBar.open(
            `Usuário ou senha inválidos!`,
            '',
            { duration: 6000 }
          );
        },
      });
      
      this.loading = false
    } else {
      this.loading = false;
      this.snackBar.open(
        `Verifique os erros nos campos para entrar no sistema!`,
        '',
        { duration: 6000 }
      );
    }
  }
}
