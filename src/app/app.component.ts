import { Component,OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from "./Components/test/test.component";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { KeycloakService } from './services/keycloak.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule, Routes} from '@angular/router';
import { Router } from '@angular/router';
import { routes } from './app.routes';
import { MatToolbarModule } from '@angular/material/toolbar';
import { GeneralServicesService } from './services/general-services.service';
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
    RouterModule,
    MatSidenavModule,
    MatToolbarModule
    ],
    providers:[KeycloakService]
})
export class AppComponent  {
  title = 'Employee_Organization';

  username:string = '' ;
 keyAuth : any ;

 Data : boolean = true ;
  
 constructor(private keycloakService: KeycloakService,private router: Router ,private service:GeneralServicesService) {
  }
 async ngOnInit(): Promise<void> {
  try {
    const authenticated = await this.keycloakService.init();
   this.keyAuth= this.keycloakService;
  this.username = this.keyAuth.keycloak.tokenParsed.given_name.toUpperCase();
  } catch (error) {
    console.error('Error during Keycloak initialization:', error);
  }
}
  logout(){
    this.keycloakService.logout(); 
  }

  newFunction(){
    this.Data = !this.Data
    this.service.myDataFunction(this.Data)
  }

}
