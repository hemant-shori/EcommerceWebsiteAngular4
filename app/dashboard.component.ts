/**
 * Created by hemant.shori on 7/5/2016.
 */
import {Component, OnInit} from '@angular/core';
import {Product} from "./product";
import {ProductService} from "./product.service";
import {Router} from "@angular/router";
import {AppComponent} from "./app.component";
import {ProductsComponent} from "./product.component";

@Component({
    selector: 'my-dashboard',
    templateUrl: './partials/dashboard.component.html',
    styleUrls: ['./css/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private productService: ProductService,
                private router: Router) {
        AppComponent.object.showNavigationBar = false;
        AppComponent.object.showCartAndList = false;

    }

    goToProduct() {
        let link = ['/products'];
        this.router.navigate(link);
    }
}
