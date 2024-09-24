import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from 'src/app/models/person.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent],
    });
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    // arrange
    component.people = [
      new Person('Jose', 'Perez', 23, 1, 1),
      new Person('Valentina', 'Perez', 12, 1, 1),
      new Person('Santiago', 'Perez', 16, 1, 1)
    ];
    fixture.detectChanges();

    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    // act
    // assert
    expect(debugElement.length).toEqual(3);
  });

  // challenge
  it('should have a list app-person components & Valentina person selected', () => {
    // arrange
    component.people = [
      new Person('Jose', 'Perez', 23, 1, 1),
      new Person('Valentina', 'Perez', 12, 1, 1),
      new Person('Santiago', 'Perez', 16, 1, 1)
    ];
    fixture.detectChanges();

    const debugElement = fixture.debugElement.queryAll(By.css('app-person .btn-choose'));
    // act
    debugElement[1].triggerEventHandler('click', null);
    fixture.detectChanges();

    const liDebugElement: DebugElement[] = fixture.debugElement.queryAll(By.css('li'));
    const liElement: HTMLElement = liDebugElement[0].nativeElement;
    // assert
    expect(debugElement.length).toEqual(3);
    expect(liElement.textContent).toContain(component.people[1].name);
    expect(component.selectedPerson?.lastName).toEqual(component.people[1].lastName)
  });
});
