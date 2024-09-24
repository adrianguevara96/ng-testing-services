import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from 'src/app/services/product.service';
import { generateManyProducts } from 'src/app/mocks/products.mock';
import { of } from 'rxjs';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);

    TestBed.configureTestingModule({
      // imports: [ HttpClientTestingModule ],
      declarations: [
        ProductsComponent,
        ProductComponent
      ],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    // mock products
    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(productService.getAll).toHaveBeenCalled();
  });
});
