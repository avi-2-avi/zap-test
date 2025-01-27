import {PaginatedResponse} from './common';

export interface Document {
  id: number;
  openID: number;
  token: string;
  name: string;
  status: string;
  externalID: string | null;
  createdAt: Date;
  lastUpdatedAt: Date;
  company: number;
}

export interface PaginatedDocumentsResponse extends PaginatedResponse<Document> {}
