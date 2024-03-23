import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignGraphComponent } from './assign-graph.component';

describe('AssignGraphComponent', () => {
  let component: AssignGraphComponent;
  let fixture: ComponentFixture<AssignGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssignGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
