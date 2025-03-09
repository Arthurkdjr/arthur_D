import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfsComponent } from './add-profs.component';

describe('AddProfsComponent', () => {
  let component: AddProfsComponent;
  let fixture: ComponentFixture<AddProfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProfsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
