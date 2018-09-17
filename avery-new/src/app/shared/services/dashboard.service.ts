import { Auth } from './auth.service';
import { Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http : HttpClient) { }

  public dashboardTasksInfo(): Observable<any> {
    return this._http.get<any>(`http://localhost:3000/dashboard`);
  }

  public chartInfo(): Observable<any> {
    return this._http.get<any>(`http://localhost:3000/chartInfo`);
  }
}

