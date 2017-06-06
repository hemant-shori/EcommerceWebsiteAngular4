/**
 * Created by hemant.shori on 7/5/2016.
 */
import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Product} from './product';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "./product.service";
import {AppComponent} from "./app.component";
import {ProductsComponent} from "./product.component";

@Component({
    selector: 'my-product-details',
    templateUrl: './partials/product-detail.component.html',
    styleUrls: ['./css/product-details.component.css']
})
export class ProductDetailComponent implements OnInit,OnDestroy {
    error:any;
    navigated = false;
    selectedProduct:Product;
    sub:any;
	
    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                let id = +params['id'];
                this.navigated = true;
				this.selectedProduct = ProductsComponent.self.selectedProduct;
                console.log("id = " + id);
                if(this.selectedProduct.id != id){
					console.log("issue");
					this.navigated = false;
				}
            } else {
                console.log("issue");
                this.navigated = false;
                this.selectedProduct = new Product();
            }
        });
    }
	addToList(event, selectedProduct:Product){
		ProductsComponent.self.addToList(event,selectedProduct);
	}
	addToCart(event, selectedProduct:Product){
		ProductsComponent.self.addToCart(event,selectedProduct);
	}
    ngOnDestroy():any {
        this.sub.unsubscribe();
    }

    constructor(private productService:ProductService,
                private route:ActivatedRoute) {
        AppComponent.object.showNavigationBar = false;
        AppComponent.object.showCartAndList = true;
    }

}
