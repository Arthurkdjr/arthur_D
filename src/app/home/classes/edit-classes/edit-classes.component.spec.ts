import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClassesComponent } from './edit-classes.component';

describe('EditClassesComponent', () => {
  let component: EditClassesComponent;
  let fixture: ComponentFixture<EditClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
