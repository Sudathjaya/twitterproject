import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MytwitterComponent } from './mytwitter.component';

describe('MytwitterComponent', () => {
  let component: MytwitterComponent;
  let fixture: ComponentFixture<MytwitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytwitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MytwitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
