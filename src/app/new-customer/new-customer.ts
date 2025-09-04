import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';
import { error } from 'console';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './new-customer.html',
  styleUrl: './new-customer.css'
})
export class NewCustomer implements OnInit {

  newCustomerFormGroup!: FormGroup; // FormGroup pour gérer le formulaire de création de client
  constructor(private fb : FormBuilder, private customerService:CustomerService, private router:Router) {
    // Initialisation de la logique
  }

  ngOnInit(): void {
    // Logique d'initialisation du composant
    this.newCustomerFormGroup = this.fb.group({
      name: this.fb.control("", [Validators.required, Validators.minLength(4)]),
      email: this.fb.control("", [Validators.email, Validators.required])
    });
  }

  // Méthodes pour gérer la création d'un nouveau client
  handleSaveCustomer() {
    //Logique pour créer un nouveau client
    let customer:Customer= this.newCustomerFormGroup.value;
    console.log(customer);
    this.customerService.saveCustomer(customer).subscribe({
      next: data => {
        alert("Customer has been successfully saved");
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl("/customers");
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
