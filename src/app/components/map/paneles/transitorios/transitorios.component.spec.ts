import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitoriosComponent } from './transitorios.component';

describe('TransitoriosComponent', () => {
  let component: TransitoriosComponent;
  let fixture: ComponentFixture<TransitoriosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransitoriosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransitoriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
