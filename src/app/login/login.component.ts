import { HttpClient } from '@angular/common/http';
import { Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  http = inject(HttpClient)
  router = inject(Router)
  authService = inject(AuthService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });


  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }


  onSubmit(): void{
    const rawForm = this.form.getRawValue()
    if(rawForm.email && rawForm.password){
      this.authService.login(rawForm.email, rawForm.password)
      .subscribe(() => {
        this.router.navigateByUrl("/")
      })
    }
    
  }

  }


