import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NdrToolbarComponent } from './ndr-toolbar.component';

describe('NdrToolbarComponent', () => {
  let component: NdrToolbarComponent;
  let fixture: ComponentFixture<NdrToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NdrToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NdrToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
