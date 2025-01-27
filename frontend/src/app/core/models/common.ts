export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  count: number;
  next: string | null;
  previous: string | null;
  data: T[];
}

export interface ListResponse<T> {
  message: string;
  data: T[];
}
