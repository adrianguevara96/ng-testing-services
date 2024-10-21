import { Component, DebugElement } from '@angular/core';
import { ReversePipe } from './reverse.pipe';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform "roma" to "amor"', () => {
    const pipe = new ReversePipe();
    const res = pipe.transform("roma");

    expect(res).toEqual("amor");
  })

  it('should transform "arepera" to "arepera"', () => {
    const pipe = new ReversePipe();
    const res = pipe.transform("arepera");

    expect(res).toEqual("arepera");
  })
});

@Component({
  template: `
  <h5>{{ 'amor' | reverse }}</h5>
  <input type="text" [(ngModel)]="text">
  <p>{{ text | reverse }}</p>
  `
})
class HostComponent {
  text = '';
}

describe('HostComponent with ReversePipe', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostComponent, ReversePipe],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shoudl be create', () => {
    expect(component).toBeTruthy();
  })

  it('should the h5 be "roma"', () => {
    const h5DebugElement: DebugElement = fixture.debugElement.query(By.css('h5'));
    const h5Element: HTMLElement = h5DebugElement.nativeElement;

    expect(h5Element.textContent).toEqual("roma");
  })

  it('should apply reverse pipe when typing in the input', () => {
    const inputDebugElement: DebugElement = fixture.debugElement.query(By.css('input'));
    const inputElement: HTMLInputElement = inputDebugElement.nativeElement;

    const pDebugElement: DebugElement = fixture.debugElement.query(By.css('p'));
    const pElement: HTMLElement = pDebugElement.nativeElement;

    expect(pElement.textContent).toEqual('');

    inputElement.value = 'arepera';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(pElement.textContent).toEqual("arepera");
  })
})
