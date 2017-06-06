import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard.component';
import {ProductService} from "./product.service";
import {ProductsComponent} from "./product.component";
import {ProductDetailComponent} from "./product-detail.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponent,
    ProductDetailComponent,
  ],
  providers: [ ProductService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
