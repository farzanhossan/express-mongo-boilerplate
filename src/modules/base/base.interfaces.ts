export interface IBaseFilter {
  query?: string;
  searchTerm?: string;
  page?: number;
  limit?: number;
  title?: string;
  filter?: string[];
  sort?: string[];
  user?: string;
}

export interface IBaseResponse {
  success: true;
  statusCode: number;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
    skip: number;
  };
  data: [] | {} | null;
}

export interface IBaseFilterPayload {
  data: any[];
  page?: number;
  limit?: number;
  total?: number;
}

export interface IBaseEntity {
  _id: string;
  isActive: boolean;
  serial: number;
  createdBy: string;
  updatedBy: string | null;
  deletedBy: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
}
