import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly http=inject(HttpClient)

  constructor() { }

  create(task : Task):Observable<Task> {
    return this.http.post<Task>('api/task',task);
  }

  getAllTask():Observable<Task[]>{
    return this.http.get<Task[]>('api/task');
  }
}
