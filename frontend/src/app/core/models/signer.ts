import {PaginatedResponse} from './common';

export interface Signer {
  id: number;
  token: string;
  name: string;
  status: string;
  email: string;
  externalID: string | null;
  document: number;
}

export interface PaginatedSignersResponse extends PaginatedResponse<Signer> {}
