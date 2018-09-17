import { Auth } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _http : HttpClient) { }

  public getOrders(): Observable<any> {
    return this._http.get<any>(`http://localhost:3000/orders`);
  }

  public getOrderDetails(id): Observable<any> {
    return this._http.get<any>(`http://localhost:3000/orders/` + id);
  }

}

