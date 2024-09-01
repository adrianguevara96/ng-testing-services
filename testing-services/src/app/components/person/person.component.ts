import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent {
  @Input() person!: Person;
  @Output() onSelected = new EventEmitter<Person>();
  imc = '';

  constructor() {
    // this.person = new Person('Adrian', 'Guevara', 28, 86, 1.76)
  }

  calcIMC() {
    this.imc = this.person.calcIMC();
  }

  onClick() {
    this.onSelected.emit(this.person);
  }
}
