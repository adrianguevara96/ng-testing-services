import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent]
    });
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    component.product = {
      id: '1',
      title: 'test',
      price: 1,
      images: ['url1', 'url2', 'url3'],
      description: 'testing desc',
      category: {
        id: 0,
        name: 'X'
      }
    };
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
