import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

describe('PersonComponent', () => {
  let component: PersonComponent;
  // instancia de nuestro componente
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonComponent]
    });

    // crear componente
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    component.person = new Person('Adrian', 'Guevara', 28, 80, 1.76);

    // ciclo de vida de angular
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

  // simulating click

  it('should display a text "overweight lv 2" with IMC when get button text', () => {
    // arrange
    const expectMsg = 'overweight lv 2'
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65);
    const button = fixture.debugElement.query(By.css('button.btn-imc'))
    .nativeElement;
    // act
    component.calcIMC();
    fixture.detectChanges();
    // assert
    expect(button.textContent).toContain(expectMsg);
  });

  it('should display a text "overweight lv 2" with IMC when do click', () => {
    // arrange
    const expectMsg = 'overweight lv 2'
    component.person = new Person('Juan', 'Perez', 30, 120, 1.65);
    const buttonDebug: DebugElement = fixture.debugElement.query(By.css('button.btn-imc'))
    const buttonElement: HTMLElement = buttonDebug.nativeElement;
    // act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    // assert
    expect(buttonElement.textContent).toContain(expectMsg);
  });
});
