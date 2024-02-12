import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {
  private value = 'my value';
  testing = true;

  constructor() { }


  getValue() {
    this.testing = false;
    return this.value;
  }

  setValue(value: string) {
    this.value = value;
  }

  getPromiseValue() {
    return Promise.resolve('promise value');
  }

  getObservableValue() {
    this.testing = false;
    return of('observable value');
  }
}
