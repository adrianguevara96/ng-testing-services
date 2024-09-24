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
    this.productService.getAll()
    .subscribe( data => {
      this.products = data;
    })
  }
}
