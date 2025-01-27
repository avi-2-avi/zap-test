import {Component, OnInit} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CompanyService} from '../../core/services/company.service';
import {InputTextModule} from 'primeng/inputtext';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, NgIf, FormsModule, InputTextModule, Toast],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  empresaZapExists: boolean = false;
  apiTokenInputVisible: boolean = false;
  apiToken: string = '';

  constructor(private router: Router, private companyService: CompanyService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.checkEmpresaZap();
  }

  checkEmpresaZap(): void {
    this.companyService.getCompanies().subscribe({
      next: (response) => {
        const empresaZap = response.data.find((company: any) => company.name === 'Empresa Zap');
        if (empresaZap) {
          if (empresaZap.api_token) {
            this.empresaZapExists = true;
            this.apiTokenInputVisible = false;

            localStorage.setItem('company_id', (empresaZap.id).toString());
            localStorage.setItem('api_token', empresaZap.api_token);
          } else {
            this.empresaZapExists = false;
            this.apiTokenInputVisible = true;
          }
        } else {
          localStorage.removeItem('company_id');
          localStorage.removeItem('api_token');
          this.empresaZapExists = false;
          this.apiTokenInputVisible = true;
        }
      },
      error: () => {
        this.empresaZapExists = false;
        this.apiTokenInputVisible = true;
      },
    });
  }

  isBearerToken(token: string): boolean {
    const bearerTokenRegex = /^[A-Za-z0-9\-\._~\+\/]+=*$/;
    return token.length >= 20 && bearerTokenRegex.test(token);
  }

  submitApiToken() {
    if (!this.apiToken.trim()) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Por favor ingrese un token válido'});
      return;
    }

    if (!this.isBearerToken(this.apiToken)) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'El token debe ser un Bearer token'});
      return;
    }

    this.companyService
      .createCompany({name: 'Empresa Zap', api_token: this.apiToken})
      .subscribe({
        next: (response) => {
          localStorage.setItem('company_id', response.data.id);
          localStorage.setItem('api_token', this.apiToken);

          this.empresaZapExists = true;
          this.apiTokenInputVisible = false;

          setTimeout(() => {
            this.empresaZapExists = true;
            this.apiTokenInputVisible = false;
            this.router.navigate(['/documents']);
          }, 0);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un problema al guardar el token',
          })
        },
      });
  }

  navigateToDocuments() {
    this.router.navigate(['/documents']);
  }
}
