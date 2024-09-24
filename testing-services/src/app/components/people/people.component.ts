import { Component } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {

  person: Person = new Person('Adrian', 'Guevara', 28, 86, 1.76);
  people: Person[] = [
    new Person('Adrian', 'Guevara', 28, 86, 1.76),
    new Person('Anyami', 'Cornieles', 29, 70, 1.62)
  ];
  selectedPerson: Person | null = null;

  choose(person: Person) {
    this.selectedPerson = person;
  }
}
