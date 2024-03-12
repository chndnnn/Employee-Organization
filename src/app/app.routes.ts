import { Routes } from '@angular/router';
import { TestComponent } from './Components/test/test.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { TaskComponent } from './Components/task/task.component';

export const routes: Routes = [
    {path:"test",component:TestComponent},
    {path:"welcome",component:WelcomeComponent},
    {path:"tasks",component:TaskComponent}

    
];
