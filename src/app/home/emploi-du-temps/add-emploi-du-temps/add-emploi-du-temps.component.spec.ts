import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmploiDuTempsComponent } from './add-emploi-du-temps.component';

describe('AddEmploiDuTempsComponent', () => {
  let component: AddEmploiDuTempsComponent;
  let fixture: ComponentFixture<AddEmploiDuTempsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmploiDuTempsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmploiDuTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
