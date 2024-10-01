import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from 'src/app/services/product.service';
import { generateManyProducts } from 'src/app/mocks/products.mock';
import { defer, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

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

  describe('tests for getAllProducts', () => {
    it('should return and render product list', () => {
      // arrannge
      const productsMock = generateManyProducts(10);
      component.products = [];
      productService.getAll.and.returnValue(of(productsMock));
      // act
      component.getAllProducts();
      fixture.detectChanges();

      const appProductDebugElements: DebugElement[] = fixture.debugElement.queryAll(By.css('app-product'));
      const appProductElement: HTMLElement = appProductDebugElements[0].nativeElement;

      // assert
      expect(component.products.length).toEqual(productsMock.length);
      expect(appProductDebugElements.length).toEqual(10);
      expect(appProductElement.textContent).toContain(productsMock[0].title);
    });

    it('should change the status "loading" to "success"', fakeAsync(() => {
      // arrange
      const productsMock = generateManyProducts(10);
      component.products = [];
      productService.getAll.and.returnValue(defer(() => Promise.resolve(productsMock)));
      // act
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');
      tick(); // exec all task pending [obs, setTimeout, promise]
      fixture.detectChanges();

      // assert
      expect(component.status).toEqual('success');
    }))

    it('should change the status "loading" to "error"', fakeAsync(() => {
      // arrange
      component.products = [];
      productService.getAll.and.returnValue(defer(() => Promise.reject('error')));
      // act
      component.getAllProducts();
      fixture.detectChanges();

      expect(component.status).toEqual('loading');
      tick(3000); // exec all task pending [obs, setTimeout, promise]
      fixture.detectChanges();

      // assert
      expect(component.status).toEqual('error');
    }))
  })
});
