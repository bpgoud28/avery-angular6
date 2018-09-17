import { FooterComponent } from './../footer/footer.component';
import { LeftnavComponent } from './../leftnav/leftnav.component';
import { HeaderComponent } from './../header/header.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout.routing.module';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    LeftnavComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  providers: [  ]
})
export class LayoutModule { }
