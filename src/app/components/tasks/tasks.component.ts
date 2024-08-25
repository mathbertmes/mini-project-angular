import { Component } from '@angular/core';
import { Task } from '../task/task.interface';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { MatCardModule } from '@angular/material/card';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from '../../task-dialog/task-dialog.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, CommonModule, MaterialModule, MatCardModule, DragDropModule, MatDialogModule, TaskDialogComponent ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  

  todo: Task[] = [{
    title: 'Buy milk',
    description: 'Go to the store and buy milk'
  },
  {
    title: 'Create a Kanban app',
    description: 'Using Firebase and Angular create a Kanban app!'
  }];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(private dialog: MatDialog) {}

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult|undefined) => {
        if (!result) {
          return;
        }
        this.todo.push(result.task);
      });
  }

  
  editTask(list: string, task: Task): void {}

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      return;
    }
    if (!event.container.data || !event.previousContainer.data) {
      return;
    }
    
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  

  
}
