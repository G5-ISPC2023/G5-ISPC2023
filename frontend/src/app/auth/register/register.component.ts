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
    paises = ["Argentina", "Chile", "Uruguay", "Bolivia", "Paraguay", "Brasil", "Peru", "Colombia", "Ecuador", "Venezuela", "Mexico", "Estados Unidos"]

  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordRepeat: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    telefono: ['', Validators.required],
    dni: ['', Validators.required],
    pais: ['', Validators.required],
    tyc: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: Router) { }

  get email() { return this.registerForm.get('email')!; }
  get password() { return this.registerForm.get('password')!; }
  get passwordRepeat() { return this.registerForm.get('passwordRepeat')!; }
  get nombre() { return this.registerForm.get('nombre')!; }
  get apellido() { return this.registerForm.get('apellido')!; }
  get dni() { return this.registerForm.get('dni')!; }
  get pais() { return this.registerForm.get('pais')!; }
  get telefono() { return this.registerForm.get('telefono')!; }
  get tyc() { return this.registerForm.get('tyc')!; }


  register() {
    let registerRequest = {
      email: this.registerForm.value.email,
      contraseña: this.registerForm.value.password,
      nombre: this.registerForm.value.nombre,
      apellido: this.registerForm.value.apellido,
      pais: this.registerForm.value.pais,
      telefono: this.registerForm.value.telefono,
      dni: this.registerForm.value.dni,
      rolId: 1,
      dinero: 1000000
    };
    if (this.registerForm.valid) {
      this.authService.register(registerRequest).subscribe({
        next: (value) => {
          console.log("value", value);
          this.route.navigate(['login']);
        },
        error: (error) => {
          console.error(error);
          this.error = error.error.mensaje;
        },
        complete: () => {}
      });
    }
  }

  navigate() {
    this.route.navigate(['login']);
  }
}
