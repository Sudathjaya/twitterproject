import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltwittersComponent } from './alltwitters.component';

describe('AlltwittersComponent', () => {
  let component: AlltwittersComponent;
  let fixture: ComponentFixture<AlltwittersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlltwittersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlltwittersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
