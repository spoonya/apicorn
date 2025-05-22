import { HttpMethod } from './http-method';

export type Header = {
  key: string;
  value: string;
};

export interface RequestData {
  method: HttpMethod | string;
  url: string;
  headers?: Array<{ key: string; value: string }>;
  body?: string;
}
