import { Injectable } from '@angular/core';
import Keycloak, { KeycloakInstance } from 'keycloak-js';
import keycloakConfig from '../keycloak-config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private keycloak!: KeycloakInstance;

  constructor( private router:Router) { }

  init(): Promise<boolean> {
    debugger;
    return new Promise<boolean>((resolve, reject) => {
      this.keycloak = new Keycloak(keycloakConfig);
      this.keycloak.init({
        //checkLoginIframe: false, 
      onLoad: 'login-required',
      }).then((authenticated) => {
        console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
        resolve(authenticated);
      }).catch((error) => {
        console.error('Keycloak initialization error:', error);
        reject(error);
      });
    });
  }

logout(){
  this.keycloak.logout();
}


  // logout(): void {
  //   debugger;
  //   this.keycloak.logout();
  //   // if (this.keycloak) {
  //   //   this.keycloak.logout().then(() => {
  //   //     console.log('Logout successful. Navigating to login page...');
  //   //     this.router.navigate(['/login']);
  //   //   }).catch(error => {
  //   //     console.error('Logout error:', error);
  //   //   });
  //   // } else {
  //   //   console.warn('Keycloak instance not initialized.');
  //   // }
  // }
  // logout(): void {
  //   debugger;
  //   console.log('Before logout. isAuthenticated:', this.isAuthenticated());
  //   this.keycloak.logout().then(() => {
  //     console.log('Logout successful. Navigating to login page...');
  //     this.router.navigate(['/login']);
  //   }).catch(error => {
  //     console.error('Logout error:', error);
  //   });
  // }

  isAuthenticated(): boolean {
    return this.keycloak?.authenticated || false;
  }

}
