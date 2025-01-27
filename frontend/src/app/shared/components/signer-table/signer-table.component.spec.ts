import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignerTableComponent } from './signer-table.component';

describe('SignerTableComponent', () => {
  let component: SignerTableComponent;
  let fixture: ComponentFixture<SignerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
