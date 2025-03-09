import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtudiantsComponent } from './add-etudiants.component';

describe('AddEtudiantsComponent', () => {
  let component: AddEtudiantsComponent;
  let fixture: ComponentFixture<AddEtudiantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEtudiantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
