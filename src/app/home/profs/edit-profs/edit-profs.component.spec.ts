import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfsComponent } from './edit-profs.component';

describe('EditProfsComponent', () => {
  let component: EditProfsComponent;
  let fixture: ComponentFixture<EditProfsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
