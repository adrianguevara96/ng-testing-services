import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersComponent } from './others.component';
import { ReversePipe } from 'src/app/pipes/reverse.pipe';
import { FormsModule } from '@angular/forms';
import { HighligthDirective } from 'src/app/directives/highligth.directive';

describe('OthersComponent', () => {
  let component: OthersComponent;
  let fixture: ComponentFixture<OthersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OthersComponent, ReversePipe, HighligthDirective],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(OthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
