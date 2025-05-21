import { requestMethods } from '@/services';

export type HttpMethod = (typeof requestMethods)[number]['value'];
