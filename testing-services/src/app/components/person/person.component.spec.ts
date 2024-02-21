import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonComponent]
    });
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "Adrian"', () => {
    component.person = new Person('Adrian', 'Guevara', 28, 80, 1.76);
    expect(component.person.name).toEqual('Adrian');
  })

  it('should have <p> with "Mi altura es {{ person.height }} "', () => {
    component.person = new Person('Adrian', 'Guevara', 28, 80, 1.76);
    // arrange
    // elemento que se renderiza
    const personElement: HTMLElement = fixture.nativeElement;
    const p = personElement.querySelector('p');
    // act
    fixture.detectChanges();

    // assert
    expect(p?.textContent).toEqual(`Mi altura es ${component.person.height}`);
  });

  it('should have <p> with "Mi altura es {{ person.height }}" with debugElement && byCss', () => {
    component.person = new Person('Adrian', 'Guevara', 28, 80, 1.76);

    // para aplicar server side rendering, mejorar el rendimiento
    // buena practica, crear el debug element y de el partir
    const personDebug: DebugElement = fixture.debugElement;
    // tomar un selector con platform browser
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    // elemento que se renderiza
    const pElement: HTMLElement = pDebug.nativeElement;

    fixture.detectChanges();

    expect(pElement.textContent).toEqual(`Mi altura es ${component.person.height}`);
  });

  it('should have <h3> with "Hola, {{ person.name }}" with debugElement && byCss', () => {
    component.person = new Person('Adrian', 'Guevara', 28, 80, 1.76);

    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;

    fixture.detectChanges();

    // to equal
    expect(h3Element.textContent).toEqual(`Hola, ${component.person.name}`);
    // to contain
    expect(h3Element.textContent).toContain(`Hola, ${component.person.name}`);
  });
});
