import { useState } from 'react';

import { HttpMethod, KeyValue } from '@/types';

export const useRequestConfig = (initialState: {
  method: HttpMethod;
  url: string;
  body: string;
  headers?: KeyValue[];
}) => {
  const [method, setMethod] = useState<HttpMethod>(initialState.method);
  const [url, setUrl] = useState(initialState.url);
  const [body, setBody] = useState(initialState.body);
  const [headers, setHeaders] = useState<KeyValue[]>(
    initialState.headers || []
  );

  return {
    method,
    setMethod,
    url,
    setUrl,
    body,
    setBody,
    headers,
    setHeaders,
  };
};
