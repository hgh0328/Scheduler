import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCharacterDialogComponent } from './remove-character-dialog.component';

describe('RemoveCharacterDialogComponent', () => {
  let component: RemoveCharacterDialogComponent;
  let fixture: ComponentFixture<RemoveCharacterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveCharacterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveCharacterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
