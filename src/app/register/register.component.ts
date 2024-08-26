import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder)
  http = inject(HttpClient)
  router = inject(Router)
  authService = inject(AuthService);

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required])
  }, [this.matching("password", "confirmPassword")]);

  get username() {
    return this.form.get('username');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }
  get confirmPassword(){
    return this.form.get('confirmPassword')
  }

  matching(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
        const control = controls.get(controlName);
        const checkControl = controls.get(checkControlName);
        if(control === null) return null;
        if(checkControl === null) return null;
        if (control.value !== checkControl.value) {
            checkControl.setErrors({ matching: true });
            return { matching: true };
        }
        return null;
    };
}

  onSubmit(): void{
    const rawForm = this.form.getRawValue()
    if(rawForm.email && rawForm.password && rawForm.username){
      this.authService.register(rawForm.email, rawForm.password, rawForm.username)
      .subscribe(() => {
        this.router.navigateByUrl("/")
      })
    }
    
  }
}
