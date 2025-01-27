import {Component, OnInit} from '@angular/core';
import {DocumentService} from '../../../core/services/document.service';
import {Document} from '../../../core/models/document';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {Tag} from 'primeng/tag';
import {Button} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {InputIcon} from 'primeng/inputicon';
import {IconField} from 'primeng/iconfield';
import {InputTextModule} from 'primeng/inputtext';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-document-table',
  imports: [
    TableModule,
    Tag,
    Button,
    FormsModule,
    DropdownModule,
    NgIf,
    NgForOf,
  ],
  templateUrl: './document-table.component.html',
  styleUrl: './document-table.component.css',
})
export class DocumentTableComponent implements OnInit {
  documents: Document[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  searchValue: string = '';
  selectedStatus: string | null = null;

  columns = [
    {field: 'id', header: 'ID', sortable: false},
    {field: 'name', header: 'Nombre', sortable: true},
    {field: 'status', header: 'Estado', sortable: true},
    {field: 'createdAt', header: 'Fecha de creación', sortable: true},
    {field: 'lastUpdatedAt', header: 'Fecha de actualización', sortable: true},
  ];

  constructor(private documentService: DocumentService) {
  }

  ngOnInit(): void {
    this.loadDocuments(1, 10);
  }

  loadDocuments(page: number, pageSize: number, filters: any = {}, sortField: string = '', sortOrder: string = ''): void {
    this.loading = true;

    const backendFilters = {
      name: filters.name || null,
      status: this.selectedStatus || null,
    };

    const orderBy = sortField ? `${sortOrder === 'desc' ? '-' : ''}${sortField}` : '';

    this.documentService
      .getDocuments(page, pageSize, backendFilters, orderBy)
      .subscribe((response) => {
        this.documents = response.data;
        this.totalRecords = response.count;
        this.loading = false;
      });

  }

  clearFilters(table: any): void {
    table.clear();
    this.searchValue = '';
    this.selectedStatus = null;
    this.loadDocuments(1, 10);
  }

  onLazyLoad(event: TableLazyLoadEvent): void {
    const page = Math.floor((event.first || 0) / (event.rows || 10)) + 1;
    const pageSize = event.rows || 10;
    const sortField = Array.isArray(event.sortField) ? event.sortField[0] : event.sortField || undefined;
    const sortOrder = event.sortOrder === -1 ? 'desc' : 'asc';

    const filters: { [key: string]: string | undefined } = {};

    if (event.filters) {
      Object.keys(event.filters).forEach((key) => {
        const filter = event.filters?.[key];
        if (filter) {
          if (Array.isArray(filter)) {
            filters[key] = filter.map((f) => f.value).filter((v) => v != null).join(',');
          } else {
            filters[key] = filter.value || null;
          }
        }
      });
    }

    this.loadDocuments(page, pageSize, filters, sortField, sortOrder);
  }

  getSeverity(status: string) {
    switch (status) {
      case 'draft':
        return 'info';
      case 'pending':
        return 'warn';
      case 'signed':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'warn';
    }
  }

  openCreateModal() {

  }

  openEditModal(document: any) {

  }

  openDeleteModal(document: any) {

  }
}
