import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { ValueService } from './value.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ValueService', ['getValue']);

    TestBed.configureTestingModule({
      providers: [
        MasterService,
        { provide: ValueService, useValue: spy },
      ]
    });
    masterService = TestBed.inject(MasterService);
    valueServiceSpy = TestBed.inject(ValueService) as jasmine.SpyObj<ValueService>;
  });

  it('should be created', () => {
    expect(masterService).toBeTruthy();
  });

  // it('should return "my value" from the real service', () => {
  //   let valueService = new ValueService();
  //   let masterService = new MasterService(valueService);
  //   expect(masterService.getValue()).toBe('my value');
  // });

  // it('should return "other value" from the fake object', () => {
  //   let fakeValueService = { getValue: () => 'fake from obj'};
  //   let masterService = new MasterService(fakeValueService as ValueService);
  //   expect(masterService.getValue()).toBe('fake from obj');
  // });

  it('should call to getValue from ValueService', () => {
    valueServiceSpy.getValue.and.returnValue('fake value');

    expect(masterService.getValue()).toBe('fake value');
    // expect(valueServiceSpy.getValue());
    expect(valueServiceSpy.getValue).toHaveBeenCalled();
    expect(valueServiceSpy.getValue).toHaveBeenCalledTimes(1);
  })
});
