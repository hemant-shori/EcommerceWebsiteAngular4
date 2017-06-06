import {Injectable}    from '@angular/core';
import {Headers, Http} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import {Product} from './product';

@Injectable()
export class ProductService {

    private productUrl = 'https://saraex01.mybluemix.net/cproduct/';  // URL to web api

    constructor(private http:Http) {
    }
     getProducts() : Observable<Product[]>{
         // ...using get request
         return this.http.get(this.productUrl)
                        // ...and calling .json() on the response to return data
                         .map((response:Response) => {
                             return response.json();
                             })
                         //...errors if any
                         .catch(this.handleError);
        
     }

     searchProducts(term: string) : Observable<Product[]>{
         // ...using get request
         return this.http.get(this.productUrl + term)
                        // ...and calling .json() on the response to return data
                         .map((response:Response) => {
                             alert(JSON.stringify(response.json()));
                             return response.json();
                             })
                         //...errors if any
                         .catch(this.handleError);
        
     }
     
    private handleError(error:any) {
        console.error('An error occurred', error);
        return Observable.throw(error.json().error || 'Server error');
    }
}


