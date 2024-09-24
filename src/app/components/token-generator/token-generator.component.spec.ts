import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenGeneratorComponent } from './token-generator.component';

describe('TokenGeneratorComponent', () => {
  let component: TokenGeneratorComponent;
  let fixture: ComponentFixture<TokenGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
