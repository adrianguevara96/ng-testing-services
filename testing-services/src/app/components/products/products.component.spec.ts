import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from 'src/app/services/product.service';
import { generateManyProducts } from 'src/app/mocks/products.mock';
import { defer, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ValueService } from 'src/app/services/value.service';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  let valueService: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const valueServiceSpy = jasmine.createSpyObj('ValueService', ['getPromiseValue']);

    TestBed.configureTestingModule({
      // imports: [ HttpClientTestingModule ],
      declarations: [
        ProductsComponent,
        ProductComponent
      ],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: ValueService, useValue: valueServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    valueService = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
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

  describe('tests for callPromise', () => {
    it('should call to promise', async () => {
      // arrange
      const mockMsg = 'my mock string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      // act
      await component.callPromise();
      fixture.detectChanges();
      // assert
      expect(component.res).toEqual(mockMsg);
    })

    it('should show "my mock string" in <p> when btn was clicked', fakeAsync(() => {
      // arrange
      const mockMsg = 'my mock string';
      valueService.getPromiseValue.and.returnValue(Promise.resolve(mockMsg));
      // act
      const btnDebugElement: DebugElement = fixture.debugElement.query(By.css('.btn-promise'));

      btnDebugElement.triggerEventHandler('click', null);
      tick();
      fixture.detectChanges();
      const pDebugElement: DebugElement = fixture.debugElement.query(By.css('p.res'));
      const pElement: HTMLElement = pDebugElement.nativeElement;
      // assert
      expect(component.res).toEqual(mockMsg);
      expect(pElement.textContent).toEqual(mockMsg);
    }))
  })
});
