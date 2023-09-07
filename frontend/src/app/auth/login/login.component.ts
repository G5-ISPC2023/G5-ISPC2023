import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms"
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: string = "";

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {

  }

  get email() { return this.loginForm.controls.email }
  get password() { return this.loginForm.controls.password }

  login(){
    this.authService.login(this.loginForm.value).subscribe({
      next: (value) => {
        console.log(value)
        this.route.navigate(['dashboard'])
      },
      error: (error) => {
        console.error(error)
        this.error = error
      },
      complete: () => {}
    })
  }

  navigate(){
    this.route.navigate(['register'])
  }
}
