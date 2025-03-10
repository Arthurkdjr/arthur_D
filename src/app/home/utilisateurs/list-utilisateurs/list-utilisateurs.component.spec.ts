import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUtilisateursComponent } from './list-utilisateurs.component';

describe('ListUtilisateursComponent', () => {
  let component: ListUtilisateursComponent;
  let fixture: ComponentFixture<ListUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUtilisateursComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
