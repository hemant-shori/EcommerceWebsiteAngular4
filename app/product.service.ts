import {Injectable}    from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Product} from './product';

@Injectable()
export class ProductService {

    private productUrl = 'api/products';  // URL to web api

    constructor(private http:Http) {
    }

    getProducts():Promise<Product[]> {
        return this.http.get(this.productUrl)
            .toPromise()
            .then(response => response.json().data as Product[])
            .catch(this.handleError);
    }

    getProductById(id:number) {
        return this.getProducts()
            .then(products => products.filter(product => product.id === id)[0]);
    }

    getProductByCompany(company:string[]) {
        return this.getProducts()
            .then(products => products.filter(product => {
                for (var i = 0; i < company.length; i++) {
                    console.log(product.company+" | "+company[i]);
                    if (product.company === company[i])
                        return true;
                }
                return false;
            }));
    }

    getProductByProcessor(company:string) {
        return this.getProducts()
            .then(products => products.filter(product => product.company === company)[0]);
    }

    getProductByOS(company:string) {
        return this.getProducts()
            .then(products => products.filter(product => product.company === company)[0]);
    }

    getProductByRam(company:string) {
        return this.getProducts()
            .then(products => products.filter(product => product.company === company)[0]);
    }

    getProductByHHD(company:string) {
        return this.getProducts()
            .then(products => products.filter(product => product.company === company)[0]);
    }

    save(hero:Product):Promise<Product> {
        if (hero.id) {
            return this.put(hero);
        }
        return this.post(hero);
    }

    delete(hero:Product) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.productUrl}/${hero.id}`;

        return this.http
            .delete(url, headers)
            .toPromise()
            .catch(this.handleError);
    }

    // Add new Product
    private post(hero:Product):Promise<Product> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.productUrl, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    // Update existing Product
    private put(hero:Product) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.productUrl}/${hero.id}`;

        return this.http
            .put(url, JSON.stringify(hero), {headers: headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    private handleError(error:any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}


