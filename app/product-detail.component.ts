/**
 * Created by hemant.shori on 7/5/2016.
 */
import {Component, Input, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {Product} from './product';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "./product.service";
import {AppComponent} from "./app.component";

@Component({
    selector: 'my-product-details',
    templateUrl: './partials/product-detail.component.html',
    styleUrls: ['./css/product-details.component.css']
})
export class ProductDetailComponent implements OnInit,OnDestroy {
    @Output()
    close = new EventEmitter();
    error:any;
    navigated = false;
    selectedProduct:Product;
    sub:any;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            if (params['id'] !== undefined) {
                let id = +params['id'];
                this.navigated = true;
                console.log("id = " + id);
                this.productService.getProductById(id)
                    .then(product => {
                        console.log(product.filterCompanyNames);
                        console.log(product.image);
                        console.log(product.name);
                            this.selectedProduct = product;
                        }
                    );
            } else {
                console.log("issue");
                this.navigated = false;
                this.selectedProduct = new Product();
            }
        });
    }

    ngOnDestroy():any {
        this.sub.unsubscribe();
    }

    constructor(private productService:ProductService,
                private route:ActivatedRoute) {
        AppComponent.object.showNavigationBar = false;
        AppComponent.object.showCartAndList = true;
    }

    save() {
        this.productService
            .save(this.selectedProduct)
            .then(hero => {
                this.selectedProduct = hero; // saved hero, w/ id if new
                this.goBack(hero);
            })
            .catch(error => this.error = error); // TODO: Display error message
    }

    goBack(savedHero:Product = null) {
        this.close.emit(savedHero);
        if (this.navigated)
            window.history.back();
    }
}
