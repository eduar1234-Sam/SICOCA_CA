import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import {PaymentsComponent } from './payments/payments.component'

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    {path: 'payments', component: PaymentsComponent}
];
