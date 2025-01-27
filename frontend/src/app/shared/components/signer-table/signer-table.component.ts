import {Component} from '@angular/core';
import {Signer} from '../../../core/models/signer';
import {SignerService} from '../../../core/services/signer.service';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Tag} from 'primeng/tag';
import {Dialog} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {InputText} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {formatDateToSpanishLocal} from '../../utils/date-formatter';

@Component({
  selector: 'app-signer-table',
  imports: [
    Button,
    NgForOf,
    NgIf,
    TableModule,
    Tag,
    Dialog,
    DropdownModule,
    InputText,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    Toast
  ],
  templateUrl: './signer-table.component.html',
  styleUrl: './signer-table.component.css',
  providers: [MessageService]
})
export class SignerTableComponent {
  signers: Signer[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  searchValue: string = '';
  selectedStatus: string | null = null;

  editDialogVisible: boolean = false;
  selectedSignerId: number | null = null;

  editFormData = {
    name: '',
    email: '',
    status: '',
  };

  editFormErrors = {
    name: false,
    email: false,
    status: false,
  };

  statusOptions = [
    {label: 'Borrador', value: 'draft'},
    {label: 'Pendiente', value: 'pending'},
    {label: 'Nuevo', value: 'new'},
    {label: 'Rechazado', value: 'rejected'},
  ];

  columns = [
    {field: 'id', header: 'ID', sortable: false},
    {field: 'name', header: 'Nombre', sortable: true},
    {field: 'email', header: 'Correo', sortable: true},
    {field: 'status', header: 'Estado', sortable: true},
  ];

  constructor(private signerService: SignerService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadSigners(1, 10);
  }

  loadSigners(page: number, pageSize: number, filters: any = {}, sortField: string = '', sortOrder: string = ''): void {
    this.loading = true;

    const backendFilters = {
      name: filters.name || null,
      email: filters.email || null,
      status: this.selectedStatus || null,
    };

    const orderBy = sortField ? `${sortOrder === 'desc' ? '-' : ''}${sortField}` : '';

    this.signerService.getSigners(page, pageSize, backendFilters, orderBy).subscribe((response) => {
      this.signers = response.data;
      this.totalRecords = response.count;
      this.loading = false;
    });
  }

  isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validateEditForm(): boolean {
    this.editFormErrors = {
      name: !this.editFormData.name,
      email: !this.isEmail(this.editFormData.email),
      status: !this.editFormData.status,
    };

    return Object.values(this.editFormErrors).every((error) => !error);
  }

  openEditModal(signer: Signer): void {
    this.selectedSignerId = signer.id;
    this.editFormData = {
      name: signer.name,
      email: signer.email,
      status: signer.status,
    };
    this.editDialogVisible = true;
  }

  updateSigner(): void {
    if (!this.selectedSignerId) return;

    if (!this.validateEditForm()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete los campos correctamente.',
      });
      return;
    }

    this.signerService
      .patchSigner(this.selectedSignerId, this.editFormData)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Documento actualizado exitosamente',
          });
          this.editDialogVisible = false;
          this.loadSigners(1, 10);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un problema al actualizar el documento',
          });
        }
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
      case 'new':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'info';
    }
  }
}
