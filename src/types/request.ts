import { HttpMethod } from './http-method';

export interface RequestResult<T = unknown> {
  status: number;
  headers: Record<string, string>;
  data: T;
  rawData: string;
  contentType?: string;
  parseError?: Error;
}

export interface RequestOptions {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  body?: string;
}
