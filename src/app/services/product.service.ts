import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { GlobalApiCallService } from './global-api-call.service';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    constructor(public globalApiCallService: GlobalApiCallService) { }

    getProducts() {
        return this.globalApiCallService.getRequest("https://fakestoreapi.com/products")
    }

    getProductById(id: number) {
        return this.globalApiCallService.getRequest("https://fakestoreapi.com/products/" + id)
    }

    addProduct(product: Product) {
        return this.globalApiCallService.postRequest("https://fakestoreapi.com/products", product)
    }

    updateProduct(id: number, product: Product) {
        return this.globalApiCallService.putRequest("https://fakestoreapi.com/products/" + id, product)

    }

    deleteProduct(id: number) {
        return this.globalApiCallService.deleteRequest("https://fakestoreapi.com/products/" + id)
    }
}
