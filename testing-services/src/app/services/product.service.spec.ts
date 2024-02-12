import { TestBed } from '@angular/core/testing';

import { ProductsService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.model';
import { environment } from './../../environments/environment.development';
import { generateManyProducts, generateOneProduct } from '../mocks/products.mock';
import { HTTP_INTERCEPTORS, HttpStatusCode } from '@angular/common/http';
import { TokenInterceptor } from '../interceptors/token.interceptor';
import { TokenService } from './token.service';

describe('ProductService', () => {
  let productService: ProductsService;
  let httpController: HttpTestingController
  let tokenService: TokenService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        TokenService,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
      ]
    });
    productService = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach( () => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(productService).toBeTruthy();
  });

  describe('test for getAllSimple', () => {
    it('should return a product list', async () => {
      // Arrange
      const mockData: Product[] = generateManyProducts(2);
      // Act
      productService.getAllSimple()
      .subscribe( (data) => {
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
      });

      // http config
      const url = `${environment.API_URL}/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);
    })

    it('should return a product list, with HEADER', async () => {
      // Arrange
      const mockData: Product[] = generateManyProducts(2);
      spyOn(tokenService, 'getToken').and.returnValue('123');
      // Act
      productService.getAllSimple()
      .subscribe( (data) => {
        expect(data.length).toEqual(mockData.length);
        expect(data).toEqual(mockData);
      });

      // http config
      const url = `${environment.API_URL}/products`
      const req = httpController.expectOne(url);
      const headers = req.request.headers;
      expect(headers.get('Authorization')).toBe('Bearer 123')
      req.flush(mockData);
    })
  })

  describe('test for getAll', () => {
    it('should return a product list', async () => {
      // Arrange
      const mockData: Product[] = generateManyProducts(2);
      // Act
      productService.getAll()
      .subscribe( (data) => {
        expect(data.length).toEqual(mockData.length);
        // esta comprobacion fallara ya que mockData no tiene taxes mientras que la respuesta de getAll si.
        // expect(data).toEqual(mockData);
      });

      // http config
      const url = `${environment.API_URL}/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);
    })

    it('should return product list with taxes', () => {
      // Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: 100,
        },
        {
          ...generateOneProduct(),
          price: 200,
        }
      ]

      // Act
      productService.getAll()
      .subscribe( (data) => {
        // console.log('data: ', data);
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(19);
        expect(data[1].taxes).toEqual(38);
      });

      // http config
      const url = `${environment.API_URL}/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);
    })

    it('should return a product with tax 0', () => {
      // Arrange
      const mockData: Product[] = [
        {
          ...generateOneProduct(),
          price: -50,
        }
      ]

      // Act
      productService.getAll()
      .subscribe( (data) => {
        // console.log('data: ', data);
        expect(data.length).toEqual(mockData.length);
        expect(data[0].taxes).toEqual(0);
      });

      // http config
      const url = `${environment.API_URL}/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);
    });

    it('should send query params with limit 10 and offset 3', async () => {
      // Arrange
      const mockData: Product[] = generateManyProducts();
      const limit = 10;
      const offset = 3;

      // Act
      productService.getAll(limit, offset)
      .subscribe( (data) => {
        // console.log('data: ', data);
        expect(data.length).toEqual(mockData.length);
      });

      // http config
      const url = `${environment.API_URL}/products?limit=${limit}&offset=${offset}`
      const req = httpController.expectOne(url);
      req.flush(mockData);

      // params
      const params = req.request.params;
      expect(params.get('limit')).toEqual(limit.toString());
      expect(params.get('offset')).toEqual(offset.toString());
    })
  })

  describe('test for create', () => {
    it('should create and return a product', (doneFn) => {
      // arrage
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'product', price: 100, images: ['img1'], description: 'hello', categoryId: 19
      }

      // act
      productService.create({...dto}) // para evitar problemas de mutacion
      .subscribe(data => {
        // assert
        expect(data).toEqual(mockData);
        doneFn();
      })

      // http config
      const url = `${environment.API_URL}/products`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto) // para prevenir que la data enviada sea la misma data creada
      expect(req.request.method).toEqual('POST');
    })
  })

  describe('test for update with PATCH', () => {
    it('should update and return a product', (doneFn) => {
      // arrage
      const mockData = generateOneProduct();
      const dto: UpdateProductDTO = {
        title: 'product 2'
      }
      const productId = '1';

      // act
      productService.updatePATCH(productId, {...dto}) // para evitar problemas de mutacion
      .subscribe(data => {
        // assert
        expect(data).toEqual(mockData);
        doneFn();
      })

      // http config
      const url = `${environment.API_URL}/products/${productId}`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto) // para prevenir que la data enviada sea la misma data creada
      expect(req.request.method).toEqual('PATCH');
    })
  })

  describe('test for delete', () => {
    it('should delete and return a boolean response', (doneFn) => {
      // arrage
      const mockData = true;
      const productId = '1';

      // act
      productService.delete(productId)
      .subscribe(data => {
        // assert
        expect(data).toEqual(mockData);
        doneFn();
      })

      // http config
      const url = `${environment.API_URL}/products/${productId}`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('DELETE');
    })
  })

  describe('test for getOne', () => {
    it('should get a product', (doneFn) => {
      // arrage
      const mockData = generateOneProduct();
      const productId = '1';

      // act
      productService.getOne(productId) // para evitar problemas de mutacion
      .subscribe(data => {
        // assert
        expect(data).toEqual(mockData);
        doneFn();
      })

      // http config
      const url = `${environment.API_URL}/products/${productId}`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
    })

    it('should return the right msg when the status code is 404', (doneFn) => {
      // arrage
      const productId = '1';
      const msgError = '404 message';
      const mockError = {
        status: 404,
        // status: HttpStatusCode.NotFound,
        statusText: msgError,
      }
      // act
      productService.getOne(productId) // para evitar problemas de mutacion
      .subscribe({
        error: (error) => {
          expect(error.message).toBe('El producto no existe.');
          doneFn();
        }
      })

      // http config
      const url = `${environment.API_URL}/products/${productId}`
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(msgError, mockError);

    })
  })
});
