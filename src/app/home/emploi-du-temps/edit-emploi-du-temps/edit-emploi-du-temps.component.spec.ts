import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmploiDuTempsComponent } from './edit-emploi-du-temps.component';

describe('EditEmploiDuTempsComponent', () => {
  let component: EditEmploiDuTempsComponent;
  let fixture: ComponentFixture<EditEmploiDuTempsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmploiDuTempsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditEmploiDuTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
