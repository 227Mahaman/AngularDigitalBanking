import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  authenticated: boolean = false;
  roles: any;
  username: any;
  accessToken: any;

  constructor(private http: HttpClient, private router : Router){

  }

  // Méthodes pour gérer le token dans le localStorage
  // Commentées pour l'instant, à implémenter selon les besoins
  // et la gestion réelle de l'authentification
  // (par exemple, après un login réussi)

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  saveToken(token: string, roles: [], username: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    localStorage.setItem('username', username);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('jwt-token', this.accessToken);
  }

  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('username');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('jwt-token');
  }

  public login(username:string, password:string){// S'authentifier
    let options = {
      headers: new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded")
    }
    let params = new HttpParams().set("username", username).set("password", password);
    return this.http.post(environment.apiUrl+"/auth/login", params, options);
  }

  loadProfile(data: any) {
    this.authenticated = true;
    this.accessToken = data['access_token'];
    console.log("Access Token "+this.accessToken);
    if(typeof this.accessToken==='string' && this.accessToken.length>0){
      let decodedJwt: any = jwtDecode(this.accessToken);
      console.log("Decoder: "+decodedJwt);
      this.username = decodedJwt.sub;
      this.roles = decodedJwt.scope;
      this.saveToken(this.accessToken, this.roles, this.username);// STOCKAGE DU TOKEN
    } else {
      console.error('Token invalide ou manquant:', this.accessToken);
    }
  }

  logout() {
    this.removeToken();
    this.authenticated = false;
    this.roles = undefined;
    this.username = undefined;
    this.accessToken = undefined;
    this.router.navigateByUrl("/login");
  }

  loadJwtTokenFromLocalStorage() {
    let token = window.localStorage.getItem('jwt-token');
    if(token){
      this.loadProfile({acces_token : token});
      this.router.navigateByUrl("/admin/customers");
    }
  }

}
