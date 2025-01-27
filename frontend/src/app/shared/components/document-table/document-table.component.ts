import {Component, OnInit} from '@angular/core';
import {DocumentService} from '../../../core/services/document.service';
import {Document} from '../../../core/models/document';
import {TableLazyLoadEvent, TableModule} from 'primeng/table';
import {Tag} from 'primeng/tag';
import {Button, ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {NgForOf, NgIf} from '@angular/common';
import {Toast} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {Dialog} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';

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
    Toast,
    ConfirmDialog,
    ToastModule,
    ButtonModule,
    Dialog,
    InputTextModule,
  ],
  templateUrl: './document-table.component.html',
  styleUrl: './document-table.component.css',
  providers: [ConfirmationService, MessageService]
})
export class DocumentTableComponent implements OnInit {
  documents: Document[] = [];
  totalRecords: number = 0;
  loading: boolean = true;
  searchValue: string = '';
  selectedStatus: string | null = null;
  selectedDocumentId: number | null = null;

  createDialogVisible: boolean = false;
  editDialogVisible: boolean = false;

  createFormData = {
    company_id: 1, // Default ID (for our demo)
    document_name: '',
    url_pdf: '',
    signer_name: '',
    signer_email: '',
  };

  editFormData = {
    name: '',
    status: '',
  };

  statusOptions = [
    {label: 'Borrador', value: 'draft'},
    {label: 'Pendiente', value: 'pending'},
    {label: 'Firmado', value: 'signed'},
    {label: 'Rechazado', value: 'rejected'},
  ];

  createFormErrors = {
    document_name: false,
    signer_name: false,
    signer_email: false,
    url_pdf: false,
  };

  columns = [
    {field: 'id', header: 'ID', sortable: false},
    {field: 'name', header: 'Nombre', sortable: true},
    {field: 'status', header: 'Estado', sortable: true},
    {field: 'createdAt', header: 'Fecha de creación', sortable: true},
    {field: 'lastUpdatedAt', header: 'Fecha de actualización', sortable: true},
  ];

  constructor(private documentService: DocumentService, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.loadDocuments(1, 10);
  }

  loadDocuments(page: number, pageSize: number, filters: any = {}, sortField: string = '', sortOrder: string = ''): void {
    this.loading = true;

    const backendFilters = {
      name: filters.name || null,
      status: filters.status || null,
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
    this.createDialogVisible = true;
  }

  isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isUrl(url: string): boolean {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlRegex.test(url);
  }

  validateCreateForm(): boolean {
    this.createFormErrors = {
      document_name: !this.createFormData.document_name,
      signer_name: !this.createFormData.signer_name,
      signer_email: !this.isEmail(this.createFormData.signer_email),
      url_pdf: !this.isUrl(this.createFormData.url_pdf),
    };

    return Object.values(this.createFormErrors).every((isValid) => !isValid);
  }

  createDocument() {
    if (!this.validateCreateForm()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, complete los campos requeridos correctamente.',
      });
      return;
    }

    this.documentService.createDocument(this.createFormData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Documento y firmante creados exitosamente',
          });

          this.createDialogVisible = false;

          this.createFormData = {
            company_id: 1,
            document_name: '',
            url_pdf: '',
            signer_name: '',
            signer_email: '',
          };

          this.loadDocuments(1, 10);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un problema al crear el documento',
          });
        }
      }
    );
  }

  openEditModal(document: any): void {
    this.selectedDocumentId = document.id;
    this.editFormData = {
      name: document.name,
      status: document.status,
    };
    this.editDialogVisible = true;
  }

  updateDocument(): void {
    if (!this.selectedDocumentId) return;

    if (this.editFormData.name === "") {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, coloque un nombre para el documento.',
      });
      return;
    }

    this.documentService
      .patchDocument(this.selectedDocumentId, this.editFormData)
      .subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Documento actualizado exitosamente',
            });
            this.editDialogVisible = false;
            this.loadDocuments(1, 10);
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Ocurrió un problema al actualizar el documento',
            });
          }
        }
      );
  }

  openDeleteModal(event: Event, documentId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Eliminara al firmante asociado en el proceso.',
      header: '¿Esta seguro que desea eliminar el documento?',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Eliminar',
        severity: 'danger',
      },

      accept: () => {
        this.documentService.deleteDocument(documentId).subscribe({
            next: (result: any) => {
              this.messageService.add({
                severity: 'info',
                summary: 'Confirmado',
                detail: 'Documento y firmante eliminados exitosamente',
              });

              this.loadDocuments(1, 10);
            },
            error: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Ocurrió un problema al eliminar el documento',
              });
            }
          }
        );
      },
      reject: () => {
        // Close the dialog
      },
    });
  }
}
