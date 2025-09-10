import { Routes } from '@angular/router';
import { Customers } from './customers/customers';
import { Accounts } from './accounts/accounts';
import { NewCustomer } from './new-customer/new-customer';
import { CustomerAccounts } from './customer-accounts/customer-accounts';
import { Login } from './login/login';
import { AdminTemplate } from './admin-template/admin-template';
import { authenticationGuard } from './guards/authentication-guard';
import { authorizationGuard } from './guards/authorization-guard';
import { NotAuthorized } from './not-authorized/not-authorized';

export const routes: Routes = [
    {path: 'login', component: Login},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'admin', component: AdminTemplate, 
        canActivate: [authenticationGuard],
        children: [
            {path:'customers', component: Customers},
            {path:'accounts', component: Accounts},
            {path:'new-customer', component: NewCustomer, canActivate: [authorizationGuard], data: {role: ['ROLE_ADMIN']}},
            {path:'customer-accounts/:id', component: CustomerAccounts, canActivate: [authorizationGuard], data: {role: ['ROLE_ADMIN']}},
            {path:'notAuthorized', component: NotAuthorized},
        ]
    },
];
