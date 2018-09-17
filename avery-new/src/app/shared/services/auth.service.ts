import { Auth } from './auth.service';
import { Observable, ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http : HttpClient) { }

  public isLoggedIn(): Observable<Auth> {
    return this._http.get<Auth>(`http://localhost:3000/IsLoggedIn`);
  }
}

export interface Auth {
  status: boolean;
}
