import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  error: string = "";

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordRepeat: ['', Validators.required],
    nombre: ['', Validators.required, Validators.minLength(4)],
    apellido: ['', Validators.required, Validators.minLength(4)],
    telefono: ['', Validators.required],
    dni: ['', Validators.required],
    pais: ['', Validators.required],
    tyc: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router) { }

  ngOnInit(): void {

  }
  get nombre() {return this.registerForm.controls.nombre}
  get apellido() {return this.registerForm.controls.apellido}
  get dni() {return this.registerForm.controls.dni}
  get pais() {return this.registerForm.controls.pais}
  get telefono() {return this.registerForm.controls.telefono}
  get email() {return this.registerForm.controls.email}
  get password() {return this.registerForm.controls.password}
  get passwordRepeat() {return this.registerForm.controls.passwordRepeat}
  get tyc() {return this.registerForm.controls.tyc}

  register(){
    this.authService.register(this.registerForm.value).subscribe({
      next: (value) => {
        console.log(value)
        this.route.navigate(['login'])
      },
      error: (error) => {
        console.error(error)
        this.error = error
      },
      complete: () => {}
    })
  }

}
