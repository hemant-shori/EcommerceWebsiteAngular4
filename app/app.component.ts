import {Component}          from '@angular/core';
import {Product} from "./product";
import {ProductsComponent} from "./product.component";
import {Router} from "@angular/router";

@Component({
    selector: 'my-app',
    templateUrl: './main.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    showCartAndList: boolean = false;
    showNavigationBar: boolean = false;
    public static object: any;
    cartItems: Array<Product> = [];
    listItems: Array<Product> = [];
    showCart: boolean = false;
    showList: boolean = false;
    finalPriceCart: number = 0;
    timeout = null;
    constructor() {
        AppComponent.object = this;
    }

    goToHome() {
        window.location.assign("http://localhost:8081/");
    }

    onKeyUpSearch(term: string) {
        if (AppComponent.object.timeout !== null) {
            clearTimeout(AppComponent.object.timeout);
        }
        AppComponent.object.timeout = setTimeout(function () {
            ProductsComponent.self.searchProducts(term);
        }, 700);
    }


    moveFromListToCart() {
        let q = [];
        for (let i = 0; i < this.listItems.length; i++) {
            console.log("length = " + this.listItems.length);
            let element = document.getElementById("listProduct" + this.listItems[i].id);
            console.log("id = " + this.listItems[i].id);
            //noinspection TypeScriptUnresolvedVariable
            console.log("checked = " + element.checked);
            //noinspection TypeScriptUnresolvedVariable
            if (element.checked) {
                this.cartItems.push(this.listItems[i]);
                // this.updateTotalAmountCart();
                q.push(this.listItems[i]);
            }
        }
        for (let i = 0; i < q.length; i++) {
            this.removeFromList(q[i]);
        }
    }

    updateTotalAmountCart() {
        let finalPrice = 0;
        for (let i = 0; i < this.cartItems.length; i++) {
            finalPrice += (this.cartItems[i].price * this.cartItems[i].requiredQuantity);
        }
        this.finalPriceCart = finalPrice;
    }

    removeFromCart(product: Product) {
        let productIndex: number = this.findProduct(this.cartItems, product);
        if (productIndex != -1) {
            this.cartItems.splice(productIndex, 1);
            this.updateTotalAmountCart();
        }
    }

    removeFromList(product: Product) {
        let productIndex: number = this.findProduct(this.listItems, product);
        if (productIndex != -1) {
            this.listItems.splice(productIndex, 1);
        }
    }

    showHideCart(value: boolean) {
        if (value) {
            this.updateTotalAmountCart();
            document.getElementById("myBody").style.overflow = "hidden";
        } else {
            document.getElementById("myBody").style.overflow = "auto";

        }
        this.showCart = value;
    }

    showHideList(value: boolean) {
        if (value) {
            document.getElementById("myBody").style.overflow = "hidden";
        } else {
            document.getElementById("myBody").style.overflow = "auto";
        }
        this.showList = value;
    }

    //noinspection JSMethodCanBeStatic
    findProduct(listOfProduct: Product[], product: Product) {
        for (let i = 0; i < listOfProduct.length; i++) {
            if (listOfProduct[i].id == product.id) {
                return i;
            }
        }
        return -1;
    }

    public decreaseQuantityCart(product: Product) {
        if (product.requiredQuantity >= 2) {
            document.getElementById("increaseCart" + product.id).setAttribute("disabled", "false");
            let productIndex: number = this.findProduct(this.cartItems, product);
            if (productIndex != -1) {
                this.cartItems[productIndex].requiredQuantity -= 1;
                this.updateTotalAmountCart();
            }
        } else {
            document.getElementById("decreaseCart" + product.id).setAttribute("disabled", "true");
        }
    }

    public increaseQuantityCart(product: Product) {
        if (product.requiredQuantity <= product.quantity) {
            document.getElementById("decreaseCart" + product.id).setAttribute("disabled", "false");
            let productIndex: number = this.findProduct(this.cartItems, product);
            if (productIndex != -1) {
                this.cartItems[productIndex].requiredQuantity += 1;
                this.updateTotalAmountCart();
            }
        } else {
            document.getElementById("increaseCart" + product.id).setAttribute("disabled", "true");
        }
    }

    public decreaseQuantityList(product: Product) {
        if (product.requiredQuantity >= 2) {
            document.getElementById("increaseList" + product.id).setAttribute("disabled", "false");
            let productIndex: number = this.findProduct(this.listItems, product);
            if (productIndex != -1) {
                this.listItems[productIndex].requiredQuantity -= 1;
            }
        } else {
            document.getElementById("decreaseList" + product.id).setAttribute("disabled", "true");
        }
    }

    public increaseQuantityList(product: Product) {
        if (product.requiredQuantity <= product.quantity) {
            document.getElementById("decreaseList" + product.id).setAttribute("disabled", "false");
            let productIndex: number = this.findProduct(this.listItems, product);
            if (productIndex != -1) {
                this.listItems[productIndex].requiredQuantity += 1;
            }
        } else {
            document.getElementById("increaseList" + product.id).setAttribute("disabled", "true");
        }
    }

//sort options


}
