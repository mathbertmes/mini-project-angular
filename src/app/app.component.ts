import { Component, importProvidersFrom, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material/material.module';
import { SideNavComponent } from "./components/side-nav/side-nav.component";
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from './auth.service';
import { Task } from './components/task/task.interface';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent, MaterialModule, SideNavComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  authService = inject(AuthService);
  

  ngOnInit(): void {
    
    this.authService.user$.subscribe((user: any) => {
      if(user){
        this.authService.currentUserSigned.set({
          uid: user.uid,
          email: user.email!,
          username: user.displayName!,
        })
      }else{
        this.authService.currentUserSigned.set(null)
      }
    })
  }

}
