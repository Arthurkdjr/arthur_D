import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmploiDuTempsComponent } from './list-emploi-du-temps.component';

describe('ListEmploiDuTempsComponent', () => {
  let component: ListEmploiDuTempsComponent;
  let fixture: ComponentFixture<ListEmploiDuTempsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEmploiDuTempsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEmploiDuTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
