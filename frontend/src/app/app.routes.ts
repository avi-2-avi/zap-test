import { RouterModule, Routes } from '@angular/router';
import {NgModule} from '@angular/core';
import {LoginComponent} from './features/login/login.component';
import {SignersComponent} from './features/signers/signers.component';
import {DocumentsComponent} from './features/documents/documents.component';
import {AuthMiddleware} from './core/middleware/auth.middleware';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'documents', component: DocumentsComponent, canActivate: [AuthMiddleware] },
  { path: 'signers', component: SignersComponent, canActivate: [AuthMiddleware]},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
