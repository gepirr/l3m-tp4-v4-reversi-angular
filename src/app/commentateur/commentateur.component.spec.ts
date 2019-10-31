import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentateurComponent } from './commentateur.component';

describe('CommentateurComponent', () => {
  let component: CommentateurComponent;
  let fixture: ComponentFixture<CommentateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
