import { Component, OnInit } from '@angular/core';
import { Product } from './../../models/product.model';
import { ProductsService } from './../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{

  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private productService: ProductsService,
  ) { }

  ngOnInit() {
    this.getAllProducts();
  }

  // getAllProducts() {
  //   this.productService.getAllSimple()
  //   .subscribe( data => {
  //     this.products = data;
  //   });
  // }

  getAllProducts() {
    this.status = 'loading';
    this.productService.getAll(this.limit, this.offset)
    .subscribe({
      next: (data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      },
      error: (err) => {
        console.log('err: ', err);
        this.status = 'error';
      },
      complete: () => {
        this.status = 'success';
      }
    })
  }
}
