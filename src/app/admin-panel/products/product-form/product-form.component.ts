import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  productForm!: FormGroup;
  requiredValid: string = 'This field is required';
  productId: any = null;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required]
    });

    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.getProductById()
    }
  }

  getProductById() {
    this.productService.getProductById(this.productId).subscribe(x => {
      if (x) {
        this.productForm.setValue({
          title: x.title,
          price: x.price,
          description: x.price,
          image: x.image,
          category: x.category
        })
      }
    })
  }

  onSubmit(post: any): void {

    if (this.productForm.valid) {
      const productData = this.productForm.value;

      if (this.productId) {
        this.productService.updateProduct(this.productId, productData).subscribe((x: any) => {
          if (x) {
            this.toastr.success('Product has been updated successfully', 'Updated!');
            this.router.navigate(['/admin/products']);
          }
        });
      } else {
        this.productService.addProduct(productData).subscribe((x: any) => {
          if (x) {
            this.toastr.success('Product has been created successfully','Created!');
            this.router.navigate(['/admin/products']);
          }
        });
      }

    }
  }
}
