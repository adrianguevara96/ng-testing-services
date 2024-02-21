import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('PersonComponent', () => {
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

  it('should have <p> with "Soy un parrafo"', () => {
    // elemento que se renderiza
    const personElement: HTMLElement = fixture.nativeElement;
    const p = personElement.querySelector('p');
    expect(p?.textContent).toEqual('Soy un parrafo');
  });

  it('should have <p> with "Soy un parrafo" with debugElement && byCss', () => {
    // para aplicar server side rendering, mejorar el rendimiento
    // buena practica, crear el debug element y de el partir
    const personDebug: DebugElement = fixture.debugElement;
    // tomar un selector con platform browser
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    // elemento que se renderiza
    const pElement: HTMLElement = pDebug.nativeElement;
    expect(pElement.textContent).toEqual('Soy un parrafo');
  });

  it('should have <h3> with "Hola, PersonComponent" with debugElement && byCss', () => {
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;
    expect(h3Element.textContent).toEqual('Hola, PersonComponent');
  });
});
