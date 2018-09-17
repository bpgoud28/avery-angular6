import { LeftnavComponent } from './../leftnav/leftnav.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  public leftNavActiveClass: string;
  public leftnavArrowClass: string;
  public routerOutletWidth: string;
  constructor() {
    this.leftNavActiveClass = '';
    this.leftnavArrowClass = 'fa-angle-left';
  }

  ngOnInit() {  }

  public navClassChange() {
    if(this.leftNavActiveClass == 'active' ) {
      this.leftNavActiveClass = '';
      this.leftnavArrowClass = 'fa-angle-left';
    } else {
      this.leftNavActiveClass = 'active';
      this.leftnavArrowClass = 'fa-angle-right';
    }

  }
}
