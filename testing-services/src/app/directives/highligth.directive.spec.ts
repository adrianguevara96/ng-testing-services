import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighligthDirective } from './highligth.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
    <h5 class="title" highligth>Default color</h5>
    <h5 highligth="blue">Blue color</h5>
    <p highligth>Default color parrafo</p>
    <p>Otro parrafo</p>
    <input type="text" [(ngModel)]="color" [highligth]="color">
  `
})
class HostComponent {
  color = 'orange';
}

fdescribe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, HighligthDirective ],
      imports: [FormsModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {

  })

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have three highlight elements & 1 without highligth', () => {
    // const elements = fixture.debugElement.queryAll(By.css('*[highligth'));
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    const elementsWithoutD = fixture.debugElement.queryAll(By.css('*:not([highligth])'));

    expect(elements.length).toEqual(4);
    expect(elementsWithoutD.length).toEqual(2);
  })

  it('should the elements be match with bgColor', () => {
    // const elements = fixture.debugElement.queryAll(By.css('*[highligth'));
    const elements: DebugElement[] = fixture.debugElement.queryAll(By.directive(HighligthDirective));

    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('blue');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements.length).toEqual(4);
  })

  it('should the h5.title be defaultColor', () => {
    // const elements = fixture.debugElement.queryAll(By.css('*[highligth'));
    const titleDebugElement: DebugElement = fixture.debugElement.query(By.css('.title'));
    // get the directive and get the default color
    const dir = titleDebugElement.injector.get(HighligthDirective);

    expect(titleDebugElement.nativeElement.style.backgroundColor).toEqual(dir.defaultColor);
  })

  it('should bind <input> and change the bgColor', () => {
    const inputDebugE: DebugElement = fixture.debugElement.query(By.css('input'));
    const inputE: HTMLInputElement = inputDebugE.nativeElement;

    expect(inputE.style.backgroundColor).toEqual('orange');

    inputE.value = 'red';
    inputE.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(inputE.style.backgroundColor).toEqual('red');
    expect(component.color).toEqual('red');
  })
});