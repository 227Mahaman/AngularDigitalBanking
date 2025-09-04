import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer as CustomerModel } from '../model/customer.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
/**
 * Classe des Services Customer
 */
export class CustomerService {
  //backendUrl: string = 'http://localhost:8085/customers'; // URL de base pour les requêtes
  constructor(private http: HttpClient) {
    // Initialisation de la logique
  }

  public getCustomers():Observable<Array<CustomerModel>> {//Recupération des clients
    // Ici, nous pouvons appeler notre service pour récupérer les données des clients
    // En utilisant HttpClient pour faire une requête GET
    return this.http.get<Array<CustomerModel>>(environment.apiUrl+"/customers");
  }

  public searchCustomers(keyword : string):Observable<Array<CustomerModel>> {//Recherche des clients par mot-clé
    // Ici, nous pouvons appeler notre service pour récupérer les données des clients
    // En utilisant HttpClient pour faire une requête GET avec un paramètre de recherche
    return this.http.get<Array<CustomerModel>>(environment.apiUrl+'/customers/search?keyword='+keyword);
  }

  public saveCustomer(customer: CustomerModel): Observable<CustomerModel> {//Ajouter un nouveau client
    return this.http.post<CustomerModel>(environment.apiUrl+"/customers", customer);
  }

  public deleteCustomer(id: number){//Supprimer un client
    return this.http.delete(environment.apiUrl+"/customers/"+id);
  }
}
