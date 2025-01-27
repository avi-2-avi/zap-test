import { Component } from '@angular/core';
import {DocumentTableComponent} from "../../shared/components/document-table/document-table.component";
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import {SignerTableComponent} from '../../shared/components/signer-table/signer-table.component';

@Component({
  selector: 'app-signers',
  imports: [
    NavbarComponent,
    SignerTableComponent
  ],
  templateUrl: './signers.component.html',
  styleUrl: './signers.component.css'
})
export class SignersComponent {

}
