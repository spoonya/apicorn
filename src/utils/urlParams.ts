import { RequestData } from '@/types/requestData';

function encodeBase64Unicode(str: string): string {
  return btoa(unescape(encodeURIComponent(str)));
}

function decodeBase64Unicode(str: string): string {
  return decodeURIComponent(escape(atob(str)));
}

export function encodeRequestToUrl(data: RequestData): string {
  return encodeBase64Unicode(JSON.stringify(data));
}

export function decodeRequestFromUrl(encoded: string): RequestData | null {
  try {
    return JSON.parse(decodeBase64Unicode(encoded));
  } catch {
    return null;
  }
}
