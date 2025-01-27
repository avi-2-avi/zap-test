import {Component} from '@angular/core';
import {Signer} from '../../../core/models/signer';
import {SignerService} from '../../../core/services/signer.service';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {NgForOf, NgIf} from '@angular/common';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'app-signer-table',
  imports: [
    Button,
    NgForOf,
    NgIf,
    TableModule,
    Tag
  ],
  templateUrl: './signer-table.component.html',
  styleUrl: './signer-table.component.css'
})
export class SignerTableComponent {
  signers: Signer[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  searchValue: string = '';
  selectedStatus: string | null = null;

  columns = [
    {field: 'id', header: 'ID', sortable: false},
    {field: 'name', header: 'Nombre', sortable: true},
    {field: 'status', header: 'Estado', sortable: true},
  ];

  constructor(private signerService: SignerService) {
  }

  ngOnInit(): void {
    this.loadSigners(1, 10);
  }

  loadSigners(page: number, pageSize: number, filters: any = {}, sortField: string = '', sortOrder: string = ''): void {
    this.loading = true;

    const backendFilters = {
      name: filters.name || null,
      status: this.selectedStatus || null,
    };

    const orderBy = sortField ? `${sortOrder === 'desc' ? '-' : ''}${sortField}` : '';

    this.signerService.getSigners(page, pageSize, backendFilters, orderBy).subscribe((response) => {
      this.signers = response.data;
      this.totalRecords = response.count;
      this.loading = false;
    });
  }

  clearFilters(table: any): void {
    table.clear();
    this.searchValue = '';
    this.selectedStatus = null;
    this.loadSigners(1, 10);
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

    this.loadSigners(page, pageSize, filters, sortField, sortOrder);
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
        return 'info';
    }
  }
}
