/* tslint:disable use-pipe-transform-interface */
import {Pipe, PipeTransform} from '@angular/core';

import {Product} from './product';
import {ProductsComponent} from "./product.component";

@Pipe({
    name: 'removeSpacePipe',
    pure: false
})
export class RemoveSpacePipe implements PipeTransform {
    
    transform(str:string, company:Array<string>) {
        if (str == null)
            return;
        return str.replace(" ","");
    }
}
