import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Auth } from '../models/auth.model';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController
  let tokenService: TokenService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        TokenService,
      ]
    });
    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach( () => {
    httpController.verify();
  })

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('tests for login', () => {
    it('should return token', (doneFn) => {
      // Arrange
      const mockData: Auth = { access_token: '1234z' };
      // callThrough para no ejecutar el metodo real
      const spySaveToken = spyOn(tokenService, 'saveToken').and.callThrough();
      // Act
      authService.login('xxx@xxx.com', '123')
      .subscribe( (data) => {
        expect(data).toEqual(mockData);
        expect(spySaveToken).toHaveBeenCalledTimes(1);
        // con que argumento ha sido llamado
        expect(spySaveToken).toHaveBeenCalledOnceWith('1234z');
        doneFn()
      });

      // http config
      const url = `${environment.API_URL}/auth/login`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('POST');
    })

    it('saveToken should have been called one time', (doneFn) => {
      // Arrange
      const mockData: Auth = { access_token: '1234z' };
      // callThrough para no ejecutar el metodo real
      const spySaveToken = spyOn(tokenService, 'saveToken').and.callThrough();
      // Act
      authService.login('xxx@xxx.com', '123')
      .subscribe( (data) => {
        expect(spySaveToken).toHaveBeenCalledTimes(1);
        // con que argumento ha sido llamado
        expect(spySaveToken).toHaveBeenCalledOnceWith('1234z');
        doneFn()
      });

      // http config
      const url = `${environment.API_URL}/auth/login`
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('POST');
    })
  })
});
