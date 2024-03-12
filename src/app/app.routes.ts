import { Routes } from '@angular/router';
import { TestComponent } from './Components/test/test.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { EmpRegistrationComponent } from './Components/emp-registration/emp-registration.component';

export const routes: Routes = [
    {path:"test",component:TestComponent},
    {path:"welcome",component:WelcomeComponent},
    {path:"empregistration",component:EmpRegistrationComponent}
];
