import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrdersService } from './../shared/services/orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html'
})
export class OrderDetailsComponent implements OnInit {

  public params;
  public orderInfo;
  constructor(private route: ActivatedRoute, private _ordersService : OrdersService ) { }

  ngOnInit() {
    this.route.params.subscribe( params => this.params = params );
    this.getOrderDetails(this.params.id);
  }

  public getOrderDetails(id) {
    this._ordersService.getOrderDetails(id).subscribe(response =>{
      this.orderInfo = response;
    });
  }
}
