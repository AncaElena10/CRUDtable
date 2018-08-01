import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailmodalComponent } from './detailmodal.component';

describe('DetailmodalComponent', () => {
  let component: DetailmodalComponent;
  let fixture: ComponentFixture<DetailmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
