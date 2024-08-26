import { Component, inject, Input, OnInit } from '@angular/core';
import { Task } from '../task/task.interface';
import { TaskComponent } from '../task/task.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { MatCardModule } from '@angular/material/card';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult, TaskDialogResultNewTask } from '../../task-dialog/task-dialog.component';
import { AuthService } from '../../auth.service';
import { FirestoreService } from '../../firestore.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskComponent, 
    CommonModule, 
    MaterialModule, 
    MatCardModule, 
    DragDropModule, 
    
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  @Input() userId: string | undefined
  authService = inject(AuthService);
  db = inject(FirestoreService);

  todo$: Observable<Task[]> = of([]);
  inProgress$: Observable<Task[]> = of([]);
  done$: Observable<Task[]> = of([]);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    console.log(userId)
    if (userId) {
      this.todo$ = this.db.getTasksByUserIdAndStatus(userId, 'todo');
      this.inProgress$ = this.db.getTasksByUserIdAndStatus(userId, 'inProgress');
      this.done$ = this.db.getTasksByUserIdAndStatus(userId, 'done');
    }
  }

  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResultNewTask | undefined) => {
      if (!result) {
        return;
      }
      const userId = this.authService.currentUserSigned()?.uid;
      if(userId){
        const newTaskElement = {
          title: result.task.title,
          description: result.task.description,
          userId: userId,
          status: "todo"
        }
        this.db.createTask(newTaskElement)
      }
      
    });
  }

  async updateTask(taskId: string, updatedTask: Partial<Task>) {

    try {
      await this.db.updateTask(taskId, updatedTask);
      console.log('Task updated successfully!');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  async editTask(task: Task){
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '300px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult | undefined) => {
      if (!result) {
        return;
      }
      if(result.delete){
        this.db.deleteTask(result.task.id!)
        return
      }
      const updatedTask = {
        title: result.task.title,
        description: result.task.description,
      }
      this.updateTask(result.task.id!, updatedTask)

    });
  }

  deleteTask(taskId: string){
    this.db.deleteTask(taskId)
  }

  drop(event: CdkDragDrop<Task[] | null>): void {
    // Verifica se os dados das listas não são nulos antes de processar o evento
    if (event.previousContainer.data && event.container.data) {
      const item = event.previousContainer.data[event.previousIndex];
      console.log(item);
      const updatedTask: Partial<Task> = {
        status: event.container.id,
      };
      this.updateTask(item.id!, updatedTask)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }
}
