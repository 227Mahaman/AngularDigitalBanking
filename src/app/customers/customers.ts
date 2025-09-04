import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { CustomerService } from '../services/customer.service';
import { Customer as CustomerModel } from '../model/customer.model';
import { AsyncPipe } from '@angular/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { listeners } from 'process';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  imports: [AsyncPipe, NgIf, ReactiveFormsModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})
export class Customers implements OnInit {

  customers!: Observable<Array<CustomerModel>>; // Déclarons un tableau pour stocker les clients
  errorMessage! : string; // Variable pour stocker les messages d'erreur
  searchFormGroup: FormGroup | undefined;//| undefined; // FormGroup pour gérer les formulaires si nécessaire

  /**
   * Constructeur
   * @param customerService On injecte le service Customer pour pouvoir l'utiliser dans ce composant
   * @param fb 
   * @param router On injecte le routing pour la navigation
   */
  constructor(private customerService:CustomerService, private fb: FormBuilder, private router : Router){
  }

  ngOnInit(): void{
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });

    // this.customers = this.customerService.getCustomers().pipe(catchError(error => {
    //   this.errorMessage = error.message; // On stocke le message d'erreur dans la variable
    //   return throwError(error); // On lance une erreur pour que l'observable puisse être gérée
    // }));

    this.handleSearchCustomers(); // Appel de la méthode pour charger les clients
    
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup?.value.keyword;
    //if (kw) {
      this.customers = this.customerService.searchCustomers(kw).pipe(catchError(error => {
        this.errorMessage = error.message; // On stocke le message d'erreur dans la variable
        return throwError(error); // On lance une erreur pour que l'observable puisse être gérée
      }));
    // }
    // else {
    //   this.customers = this.customerService.getCustomers().pipe(catchError(error => {
    //     this.errorMessage = error.message; // On stocke le message d'erreur dans la variable
    //     return throwError(error); // On lance une erreur pour que l'observable puisse être gérée
    //   }));
    // }
  }

  handleDeleteCustomer(c:CustomerModel) {// Supprimer un client
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: (resp) => {
        //this.handleSearchCustomers();
        this.customers = this.customers.pipe(
          map(data=>{
            let index = data.indexOf(c);
            data.slice(index, 1);
            return data;
          })
        );

      },
      error: err => {
        console.log(err);
      }
    });
  }

  handleCustomerAccounts(customer: CustomerModel) {
    this.router.navigateByUrl("/customer-accounts/"+customer.id, {state: customer});
  }

}
function next(value: Object): void {
  throw new Error('Function not implemented.');
}

