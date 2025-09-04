import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { AsyncPipe, DatePipe, DecimalPipe, NgIf} from '@angular/common';
import { describe } from 'node:test';

@Component({
  selector: 'app-accounts',
  imports: [ReactiveFormsModule, NgIf, AsyncPipe, DecimalPipe, DatePipe],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css'
})
export class Accounts implements OnInit {

  accountFormGroup! : FormGroup;
  currentPage : number = 0;
  pageSize: number = 10;
  accountObservable! : Observable<AccountDetails>;
  operationFormGroup!: FormGroup;
  errorMessage! : string;

  constructor(private fb:FormBuilder, private accountService : AccountsService){//Injection du FormBuilder et AccountsService

  }

  ngOnInit(): void {
    //Initialisation du formulaire de recherche
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control('')
    });
    //Initialisation du formulaire d'operation
    this.operationFormGroup = this.fb.group({
      operationType: this.fb.control(''),
      amount: this.fb.control(0),
      description: this.fb.control(''),
      accountDestination: this.fb.control('')
    });
  }

  handleSearchAccount() {
    let accountId : string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        //return new Observable<AccountDetails>();
        return throwError(err)
      })
    );
  }

  goToPage(page: number) {//Pagination des operations du compte (du retour handleSearchAccount)
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    console.log('Form submitted');
    let accountId : string = this.accountFormGroup.value.accountId;
    let operationType : string = this.operationFormGroup.value.operationType;
    let amount : number = this.operationFormGroup.value.amount;
    let description : string = this.operationFormGroup.value.description;

    if(operationType=='DEBIT'){
      this.accountService.debit(accountId, amount, description).subscribe({
        next: (data) => {
          alert("Debit avec succes");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        }
      });
    } else if(operationType=='CREDIT'){
      this.accountService.credit(accountId, amount, description).subscribe({
        next: (data) => {
          alert("Credit avec succes");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        }
      });
    } else if(operationType=='TRANSFER'){
      let accountDestination : string = this.operationFormGroup.value.accountDestination;
      this.accountService.transfer(accountId, accountDestination, amount).subscribe({
        next: (data) => {
          alert("Virement avec succes");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log(err);
          alert(err.error.message);
        }
      });
    }

  }

}
