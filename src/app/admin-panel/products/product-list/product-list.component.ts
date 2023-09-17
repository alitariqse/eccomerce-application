import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { MatTableModule } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products!: Product[];
  displayedColumns: string[] = ['title', 'price', 'category', 'description', 'actions'];
  isLoadingResults: boolean = false
  constructor(private productService: ProductService, private sanitizer: DomSanitizer, private toastr: ToastrService, public router:Router
  ) { }

  sanitizeImageUrl(imageUrl: string) {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  ngOnInit(): void {
    let currentUserData: any = JSON.parse(localStorage.getItem('currentUserData') || '{}');
    if (currentUserData && currentUserData.role == 'user') {
      this.router.navigate(['/'])
    }
    this.getAllProducts()
  }

  getAllProducts() {
    this.isLoadingResults = true
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.isLoadingResults = false
    });
  }

  deleteProducts(id: any) {
    this.productService.deleteProduct(id).subscribe((x: any) => {
      if (x) {
        this.toastr.success('Product has been deleted successfully', 'Deleted!');
        this.getAllProducts()
      }
    })
  }
}
