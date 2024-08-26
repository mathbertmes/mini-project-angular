import { Component, inject, OnInit } from '@angular/core';
import { TasksComponent } from '../tasks/tasks.component';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TasksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  router = inject(Router)

  ngOnInit(): void {
    const userId = localStorage.getItem('userId')
    if(!userId){
      this.router.navigateByUrl("/login")
    }
  }
}
