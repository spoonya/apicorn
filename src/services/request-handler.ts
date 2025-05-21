import { RequestOptions, RequestResult } from '@/types';

export const processRequest = async (
  options: RequestOptions
): Promise<RequestResult> => {
  const proxyResponse = await fetch('/api/proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(options),
  });

  const contentType = proxyResponse.headers.get('content-type') || '';
  const rawData = await proxyResponse.text();

  let data: unknown;
  let parseError: Error | undefined;

  try {
    data = contentType.includes('application/json')
      ? JSON.parse(rawData)
      : rawData;
  } catch (error) {
    data = rawData;
    parseError = error instanceof Error ? error : new Error(String(error));
  }

  const headers: Record<string, string> = {};
  proxyResponse.headers.forEach((value, key) => {
    headers[key] = value;
  });

  return {
    status: proxyResponse.status,
    headers,
    data,
    rawData,
    contentType,
    parseError,
  };
};
