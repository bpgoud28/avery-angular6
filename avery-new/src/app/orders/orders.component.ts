import { OrdersService } from './../shared/services/orders.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders;
  public ascending: boolean;
  public stringOrder;

  public data: any[];
  public filterQuery = '';
  public rowsOnPage = 4;
  //public sortBy = 'email';
  public sortOrder = 'asc';

  constructor(private _ordersService : OrdersService,
              private modalService: NgbModal ) {
    this.getOrders();
    this.ascending = false;
    this.stringOrder = "id";
  }

  ngOnInit() {
  }

  public getOrders() {
    this._ordersService.getOrders().subscribe(response =>{
      this.orders = response;
    })
  }

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
      return a.city.length;
  }

}
