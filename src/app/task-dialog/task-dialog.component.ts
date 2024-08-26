import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../components/task/task.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [MaterialModule, MatDialogModule, MatInputModule, FormsModule, CommonModule],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css'
})
export class TaskDialogComponent {
  private backupTask!: Partial<Task>;

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {
    this.backupTask = { ...this.data.task };
  }

  cancel(): void {
    this.data.task.title = this.backupTask.title;
    this.data.task.description = this.backupTask.description;
    this.dialogRef.close(undefined);
  }
}

export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}

export interface TaskDialogResultNewTask {
  task: {title: string, description: string};
  delete?: boolean;
}

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}
