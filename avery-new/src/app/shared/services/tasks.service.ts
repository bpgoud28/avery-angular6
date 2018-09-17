import { Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private _http : HttpClient) { }

  public getTasks(): Observable<any> {
    return this._http.get<any>(`http://localhost:3000/tasks`);
  }

  public getTaskDetails(id): Observable<any> {
    return this._http.get<any>(`http://localhost:3000/tasks/${id}`);
  }

  public updateTaskDetails(data): Observable<any> {
    return this._http.patch<any>(`http://localhost:3000/tasks/${data.id}`, data);
  }

  public addTaskDetails(data): Observable<any> {
    return this._http.post<any>(`http://localhost:3000/tasks/`, data);
  }
}
