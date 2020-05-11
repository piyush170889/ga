import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginaltPage } from './loginalt.page';

describe('LoginaltPage', () => {
  let component: LoginaltPage;
  let fixture: ComponentFixture<LoginaltPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginaltPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginaltPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
