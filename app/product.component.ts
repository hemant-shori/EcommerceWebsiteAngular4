/**
 * Created by hemant.shori on 5/6/2017.
 */
import {Component, OnInit} from "@angular/core";
import {Product} from "./product";
import {AppComponent} from "./app.component";
import {Router} from "@angular/router";
import {ProductService} from "./product.service";
import {RemoveSpacePipe} from "./pipe.remove.space";
@Component({
    selector: 'my-products',
    templateUrl: './partials/product.component.html',
    styleUrls: ['./css/product.component.css'],
    pipe: [RemoveSpacePipe],
})
export class ProductsComponent implements OnInit {
    mainStock: Product[] = [];
    products: Product[] = [];
    visibleProducts: Product[] = [];
    selectedProduct: Product;
    addingProduct = false;
    error: any;
    numOfPages: number = 0;
    currentPage: number = 1;
    filterCompanyNames: string[] = ["Apple", "Dell", "HP", "Lenovo"];
    filterProcessorNames: string[] = ["i7", "i5", "i3"];
    filterRamNames: string[] = ["4GB", "8GB", "16GB"];
    filterHHDNames: string[] = ["500GB", "1TB", "2TB"];
    companyNames: string[] = [];
    processorNames: string[] = [];
    ramNames: string[] = [];
    hhdNames: string[] = [];
    public static self: any;

    constructor(private router: Router,
                private productService: ProductService) {
        AppComponent.object.showNavigationBar = true;
        AppComponent.object.showCartAndList = true;
        ProductsComponent.self = this;
    }
    sortProductsBy(sortType: string){
        if(sortType == "Name"){            
            this.products = this.mainStock.sort(function(a, b){
                    var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase();
                    if (nameA < nameB) //sort string ascending
                        return -1;
                    if (nameA > nameB)
                        return 1;
                    return 0; //default return value (no sorting)
                    });
        } else if(sortType === "Popular"){
            this.products = [];
            for(let i = 0; i < this.filterProcessorNames.length; i++){
                this.products = this.products.concat(this.mainStock.filter(product => {
                    if(product.processor.indexOf(this.filterProcessorNames[i]) !== -1)
                        return true;
                        return false;
                    }));
            }
        }

        this.updatePagination(this.products.length);
        this.updateVisibleProducts();
    }
    filterCompany(event, companyName: string) {
        event.stopPropagation();
        event.preventDefault();
        var element = document.getElementById("CompanyName" + companyName);
        //noinspection TypeScriptUnresolvedVariable
        element.checked = !element.checked;
        var index = this.companyNames.indexOf(companyName);
        console.log("index : " + index);
        if (index != -1) {
            this.companyNames.splice(index, 1);
        } else {
            this.companyNames = this.companyNames.concat(companyName);
        }
        if (this.companyNames.length == 0) {
            this.products = this.mainStock;
        } else {
            //filter products wrt this.companyNames array
            this.products = this.mainStock.filter(product => {
                for (var i = 0; i < this.companyNames.length; i++) {
                    console.log(product.company + " | " + this.companyNames[i]);
                    if (product.company === this.companyNames[i])
                        return true;
                }
                return false;
            });
        }
        this.updatePagination(this.products.length);
        this.updateVisibleProducts();
    }

    filterProcessor(event, processorName: string) {
        event.stopPropagation();
        event.preventDefault();
        var element = document.getElementById("processorName" + processorName);
        //noinspection TypeScriptUnresolvedVariable
        element.checked = !element.checked;
        var index = this.processorNames.indexOf(processorName);
        console.log("index : " + index);
        if (index != -1) {
            this.processorNames.splice(index, 1);
        } else {
            this.processorNames = this.processorNames.concat(processorName);
        }
        if (this.processorNames.length == 0) {
            this.products = this.mainStock;
        } else {
            //filter products wrt this.processorNames array
            this.products = this.mainStock.filter(product => {
                for (var i = 0; i < this.processorNames.length; i++) {
                    console.log(product.processor + " | " + this.processorNames[i]);
                    if (product.processor === "Intel Core " + this.processorNames[i] + " Processor")
                        return true;
                }
                return false;
            });
        }
        this.updatePagination(this.products.length);
        this.updateVisibleProducts();
    }

    filterRam(event, ramName: string) {
        event.stopPropagation();
        event.preventDefault();
        var element = document.getElementById(ramName);
        //noinspection TypeScriptUnresolvedVariable
        element.checked = !element.checked;
        var index = this.ramNames.indexOf(ramName);
        console.log("index : " + index);
        if (index != -1) {
            this.ramNames.splice(index, 1);
        } else {
            this.ramNames = this.ramNames.concat(ramName);
        }
        if (this.ramNames.length == 0) {
            this.products = this.mainStock;
        } else {
            //filter products wrt this.ramNames array
            this.products = this.mainStock.filter(product => {
                for (var i = 0; i < this.ramNames.length; i++) {
                    if (product.ram === this.ramNames[i])
                        return true;
                }
                return false;
            });
        }
        this.updatePagination(this.products.length);
        this.updateVisibleProducts();
    }

    filterHHD(event, hhdNames: string) {
        event.stopPropagation();
        event.preventDefault();
        var element = document.getElementById(hhdNames);
        //noinspection TypeScriptUnresolvedVariable
        element.checked = !element.checked;
        var index = this.hhdNames.indexOf(hhdNames);
        console.log("index : " + index);
        if (index != -1) {
            this.hhdNames.splice(index, 1);
        } else {
            this.hhdNames = this.hhdNames.concat(hhdNames);
        }
        if (this.hhdNames.length == 0) {
            this.products = this.mainStock;
        } else {
            //filter products wrt this.hhdNames array
            this.products = this.mainStock.filter(product => {
                for (var i = 0; i < this.hhdNames.length; i++) {
                    console.log(product.company + " | " + this.hhdNames[i]);
                    if (product.hardDisk === this.hhdNames[i])
                        return true;
                }
                return false;
            });
        }
        this.updatePagination(this.products.length);
        this.updateVisibleProducts();
    }

    private getProducts() {   
         this.productService.getProducts()
                           .subscribe(
                               products => {
                                    this.mainStock = products;
                                    this.products = products;
                                    this.updatePagination(products.length);
                                    this.updateVisibleProducts();
                                },
                                err => {
                                    // Log errors if any
                                    console.log(err);
                                });
            
    }

    searchProducts(term: string) {
         this.productService.searchProducts(term)
                           .subscribe(
                               products => {
                                    this.mainStock = products;
                                    this.products = products;
                                    this.updatePagination(products.length);
                                    this.updateVisibleProducts();
                                },
                                err => {
                                    // Log errors if any
                                    console.log(err);
                                });
    }

    updatePagination(length: number) {
        this.numOfPages = length / 8;
        this.numOfPages = Math.ceil(this.numOfPages);
        console.log("updatePagination:" + this.numOfPages);
    }


    updateVisibleProducts() {
        this.visibleProducts = this.products.slice((this.currentPage - 1) * 8, (this.currentPage * 8));
    }

    public previousPage() {
        if (this.currentPage > 1) {
            this.currentPage -= 1;
            this.updateVisibleProducts();
        } else {
            document.getElementById("previousPage").setAttribute("disabled", "true");
        }
    }

    public nextPage() {
        console.log("next:" + this.numOfPages);
        if (this.currentPage < this.numOfPages) {
            this.currentPage += 1;
            this.updateVisibleProducts();
        } else {
            document.getElementById("nextPage").setAttribute("disabled", "true");
        }
    }

    addToCart(event, product) {
        event.stopPropagation();
        var element = document.getElementById(event.target.id);
        if (!element.getAttribute("disabled")) {
            document.getElementById(event.target.id).setAttribute("disabled", "true");
            AppComponent.object.noOfItemInCart += 1;
            // console.log(AppComponent.object.cartItems.length);
            AppComponent.object.cartItems.push(product);
            console.log(AppComponent.object.cartItems.length);

        }

    }

    addToList(event, product) {
        event.stopPropagation();
        var element = document.getElementById(event.target.id);
        if (!element.getAttribute("disabled")) {
            document.getElementById(event.target.id).setAttribute("disabled", "true");
            AppComponent.object.noOfItemInList += 1;
            AppComponent.object.listItems.push(product);
        }
    }

    addProduct() {
        console.log("addingProduct");
        this.addingProduct = true;
        this.selectedProduct = null;
    }


    ngOnInit(): any {
        $.material.init();
        this.getProducts()
    }

    onSelect(product: Product) {
        this.selectedProduct = product;
        this.goToDetails();
    }


    private goToDetails() {
        let link = ['/detail', this.selectedProduct.id];
        this.router.navigate(link)
    }
}
