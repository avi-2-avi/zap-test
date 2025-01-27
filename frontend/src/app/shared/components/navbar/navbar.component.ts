import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import {Button} from 'primeng/button';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [Menubar, Button],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  items: MenuItem[] | undefined;

  constructor(private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Documentos',
        icon: 'pi pi-file',
        routerLink: ['/documents']
      },
      {
        label: 'Firmantes',
        icon: 'pi pi-user',
        routerLink: ['/signers'],
      },
    ]
  }

  logout() {
    localStorage.removeItem('company_id');
    localStorage.removeItem('api_token');
    this.router.navigate(['/login']);
  }
}
