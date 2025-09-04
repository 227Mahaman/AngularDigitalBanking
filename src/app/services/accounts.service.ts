import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AccountDetails } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
/**
 * Classe des Services Account 
 */
export class AccountsService {

  constructor(private http : HttpClient) {// Injection du HttpClient

  } 

  public getAccount(accountId : string, page : number, size : number):Observable<AccountDetails> {// Recuperer un compte client
    
    return this.http.get<AccountDetails>(environment.apiUrl+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);

  }

  public debit(accountId:string, amount:number, description:string){
    let data = { accountId:accountId, amount:amount, description:description };
    return this.http.post(environment.apiUrl+"/accounts/debit", data);
  }

  public credit(accountId:string, amount:number, description:string){
    let data = { accountId:accountId, amount:amount, description:description };
    return this.http.post(environment.apiUrl+"/accounts/credit", data);
  }
  public transfer(accountSource:string, accountDestination:string, amount:number){
    let data = { accountIdSource:accountSource, accountIdDestination:accountDestination, amount:amount };
    return this.http.post(environment.apiUrl+"/accounts/transfer", data);
  }

}
