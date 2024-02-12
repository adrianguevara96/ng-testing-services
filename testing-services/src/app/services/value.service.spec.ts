import { TestBed } from '@angular/core/testing';

import { firstValueFrom } from 'rxjs';
import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ValueService ]
    });
    service = TestBed.inject(ValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests for getValue', () => {
    // arrange - instance ValueService (beforeEach)
    // act
    it('should return "my value"', () => {
      expect(service.testing).toBeTruthy()
      expect(service.getValue()).toBe('my value');
      expect(service.testing).toBeFalse()
    })
  });

  describe('Tests for setValue', () => {
    // arrange - instance ValueService (beforeEach)
    // act
    it('should change the value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change');
    })
  });

  describe('Test for getPromiseValaue', () => {
    // arrange - instance ValueService (beforeEach)
    // act
    it('should return "promise value" from promise with then', (doneFn) => {
      service.getPromiseValue()
      .then( (res) => {
        expect(res).toBe('promise value');
        doneFn();
      })
    })

    it('should return "promise value" from promise using async', async () => {
      const response = await service.getPromiseValue();
      expect(response).toBe('promise value');
    })
  })

  describe('Test for getObservableValaue', () => {
    // arrange - instance ValueService (beforeEach)
    // act
    it('should return "observable value" from observable with subscribe', (doneFn) => {
      service.getObservableValue()
      .subscribe( (res) => {
        expect(res).toBe('observable value');
        expect(service.testing).toBeFalse()
        doneFn();
      })
    })

    it('should return "observable value" from observable using async', async () => {
      const response = await firstValueFrom(service.getObservableValue());
      expect(response).toBe('observable value');
    })
  })
});
