import {ListResponse} from './common';

export interface Company {
  id: number;
  name: string;
  api_token: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}

export interface ListCompaniesResponse extends ListResponse<Company> {}

