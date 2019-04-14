import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbooksComponent } from './listbooks.component';

describe('ListbooksComponent', () => {
  let component: ListbooksComponent;
  let fixture: ComponentFixture<ListbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListbooksComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
