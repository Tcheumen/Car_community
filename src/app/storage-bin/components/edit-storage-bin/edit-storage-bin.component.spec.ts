/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditStorageBinComponent } from './edit-storage-bin.component';

describe('EditStorageBinComponent', () => {
  let component: EditStorageBinComponent;
  let fixture: ComponentFixture<EditStorageBinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStorageBinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStorageBinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
