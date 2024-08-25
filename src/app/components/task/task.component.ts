import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from './task.interface';
import { NgIf } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [NgIf, MaterialModule, MatCardModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
}
