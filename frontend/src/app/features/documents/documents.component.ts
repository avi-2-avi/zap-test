import { Component } from '@angular/core';
import {NavbarComponent} from '../../shared/components/navbar/navbar.component';
import {DocumentTableComponent} from '../../shared/components/document-table/document-table.component';

@Component({
  selector: 'app-documents',
  imports: [
    NavbarComponent,
    DocumentTableComponent
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css'
})
export class DocumentsComponent {
}
