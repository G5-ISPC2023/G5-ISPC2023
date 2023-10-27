import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error: string = "";

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router) {

   }

  get email() { return this.loginForm.get('email')!; }
  get password() { return this.loginForm.get('password')!; }

  login() {
    const loginRequest = {
      email: this.loginForm.value.email,
      contraseña: this.loginForm.value.password
    };
    if (this.loginForm.valid) {
      this.authService.login(loginRequest).subscribe({
        next: (value) => {
          console.log(value);
          this.authService.setAuthenticated(true);
          this.route.navigate(['dashboard']);
        },
        error: (error) => {
          this.error = error;
        },
        complete: () => {}
      });
    }
  }

  navigate() {
    this.route.navigate(['register']);
  }
}
