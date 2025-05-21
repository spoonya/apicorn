import { HttpMethod } from './http-method';
import { KeyValue } from './key-value';

export interface BaseObject {
  [key: string]: string | null;
}

export interface HttpObject {
  [key: string]: RequestObject;
}

export interface RequestObject {
  method: HttpMethod;
  url: string;
  headers?: KeyValue[];
  body?: string;
}
