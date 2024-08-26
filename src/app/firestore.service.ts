import { inject, Injectable } from "@angular/core";
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, query, updateDoc, where } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Task } from "./components/task/task.interface";


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore = inject(Firestore)
  

  getTasksByUserIdAndStatus(userId: string, status: string): Observable<Task[]> {
    const tasksCollection = collection(this.firestore, 'tasks'); 
    const userTasksQuery = query(
      tasksCollection,
      where('userId', '==', userId),
      where('status', '==', status)
    )
    return collectionData(userTasksQuery, { idField: 'id' }) as Observable<Task[]>;
  }

  async createTask(task: Task): Promise<void> {
    const tasksCollection = collection(this.firestore, 'tasks'); 
    await addDoc(tasksCollection, task); 
  }

  async updateTask(taskId: string, updatedTask: Partial<Task>): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`);
    await updateDoc(taskDocRef, updatedTask);
  }

  async deleteTask(taskId: string): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`);
    await deleteDoc(taskDocRef);
  }

}