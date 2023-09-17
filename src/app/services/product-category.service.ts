import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { GlobalApiCallService } from './global-api-call.service';

@Injectable({
    providedIn: 'root',
})
export class ProductCategoriesService {

    constructor(public globalApiCallService: GlobalApiCallService) { }

    getProductsCategories() {
        return this.globalApiCallService.getRequest("https://fakestoreapi.com/products/categories")
    }

    getProductByCategories(category: any) {
        return this.globalApiCallService.getRequest("https://fakestoreapi.com/products/category/" + category)
    }

}
