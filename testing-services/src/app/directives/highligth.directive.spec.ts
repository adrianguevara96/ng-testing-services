import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighligthDirective } from './highligth.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <h5 class="title" highligth>Default color</h5>
    <h5 highligth="blue">Blue color</h5>
    <p highligth>Default color parrafo</p>
    <p>Otro parrafo</p>
  `
})
class HostComponent {}

fdescribe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, HighligthDirective ]
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

    expect(elements.length).toEqual(3);
    expect(elementsWithoutD.length).toEqual(1);
  })

  it('should the elements be match with bgColor', () => {
    // const elements = fixture.debugElement.queryAll(By.css('*[highligth'));
    const elements: DebugElement[] = fixture.debugElement.queryAll(By.directive(HighligthDirective));

    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('blue');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements.length).toEqual(3);
  })

  it('should the h5.title be defaultColor', () => {
    // const elements = fixture.debugElement.queryAll(By.css('*[highligth'));
    const titleDebugElement: DebugElement = fixture.debugElement.query(By.css('.title'));
    // get the directive and get the default color
    const dir = titleDebugElement.injector.get(HighligthDirective);

    expect(titleDebugElement.nativeElement.style.backgroundColor).toEqual(dir.defaultColor);
  })
});
