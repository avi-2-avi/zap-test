import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {
  }

  navigateToDocuments() {
    this.router.navigate(['/documents']);
  }

}
