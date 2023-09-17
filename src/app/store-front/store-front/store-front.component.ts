import { ViewEncapsulation } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { ProductCategoriesService } from 'src/app/services/product-category.service';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'store-front-root',
  templateUrl: './store-front.component.html',
  styleUrls: ['./store-front.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule, MatExpansionModule, MatToolbarModule, MatCardModule, MatGridListModule, MatProgressSpinnerModule]
})
export class StoreFrontComponent implements OnInit {

  panelOpenState = true;
  isLoadingProducts: boolean = false
  isLoadingcategories: boolean = false
  categories: any = [];
  products: any = [];

  @Input('rating') private rating: number = 3;
  @Input('starCount') private starCount: number = 5;
  @Input('color') private color: string = 'accent';
  @Output() private ratingUpdated = new EventEmitter();

  ngOnInit(): void {
    this.getAllProductsCategories()
  }



  constructor(private productCategoriesService: ProductCategoriesService) {

  }

  getAllProductsCategories() {
    this.isLoadingcategories = true
    this.productCategoriesService.getProductsCategories().subscribe(categories => {
      this.categories = categories;
      this.isLoadingcategories = false
    });
  }

  getProductsByCategory(category: any) {
    this.products = []
    this.isLoadingProducts = true
    this.productCategoriesService.getProductByCategories(category).subscribe(products => {
      this.products = products;
      this.isLoadingProducts = false
    });
  }
}
