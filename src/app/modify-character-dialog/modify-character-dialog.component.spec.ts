import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCharacterDialogComponent } from './modify-character-dialog.component';

describe('ModifyCharacterDialogComponent', () => {
  let component: ModifyCharacterDialogComponent;
  let fixture: ComponentFixture<ModifyCharacterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyCharacterDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCharacterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
