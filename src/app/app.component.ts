import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from "./Components/test/test.component";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { KeycloakService } from './services/keycloak.service';
import { RouterModule, Routes} from '@angular/router';
import { Router } from '@angular/router';
import { routes } from './app.routes';
//import { KeycloakService } from './keycloak.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, 
      TestComponent,
      MatButtonModule,
      MatIconModule,
      MatTooltipModule,
    RouterModule
    ],
    providers:[KeycloakService]
})
export class AppComponent  {
  title = 'Employee_Organization';
  
 constructor(private keycloakService: KeycloakService,private router: Router) {
  }
 async ngOnInit(): Promise<void> {
  try {
    const authenticated = await this.keycloakService.init();
    console.log('Keycloak initialization successful. Authenticated:', authenticated);
  } catch (error) {
    console.error('Error during Keycloak initialization:', error);
  }
}
  logout(){
    this.keycloakService.logout(); 
  }

}
