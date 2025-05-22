'use client';

import { useLocale } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  CodeGenPreview,
  RequestPanel,
  RequestSearch,
  ResponseViewer,
  Sidebar,
} from '@/components';
import { useRequestConfig, useRequestExecutor } from '@/hooks';
import { useDebouncedEffect } from '@/hooks/useDebouncedEffect';
import { applyVariables } from '@/lib/applyVariables';
import { getStoredVariables } from '@/lib/getStoredVariables';
import { HttpMethod } from '@/types';
import { RequestData } from '@/types/requestData';
import { saveRequestToHistory } from '@/utils/storage';
import { decodeRequestFromUrl, encodeRequestToUrl } from '@/utils/urlParams';

export default function RestClient() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const encodedReq = searchParams.get('req');

  const requestConfig = useRequestConfig({
    method: 'GET',
    url: '',
    body: '',
    headers: [],
  });

  const { execute, response, error } = useRequestExecutor();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateUrl = (newParams: string) => {
    const newPath = `/${locale}/rest-client${newParams}`;
    router.replace(newPath, { scroll: false });
  };

  useEffect(() => {
    if (encodedReq) {
      const decoded = decodeRequestFromUrl(encodedReq);
      if (decoded) {
        requestConfig.setMethod(decoded.method as HttpMethod);
        requestConfig.setUrl(decoded.url);
        requestConfig.setBody(decoded.body || '');
        requestConfig.setHeaders(
          (decoded.headers || []).map((header, index) => ({
            id: `header-${index}`,
            key: header.key,
            value: header.value,
          }))
        );
      }
      return;
    }

    const existing = localStorage.getItem('requests');
    if (existing) {
      try {
        const history: RequestData[] = JSON.parse(existing);
        if (Array.isArray(history) && history.length > 0) {
          const last = history[0];
          requestConfig.setMethod(last.method as HttpMethod);
          requestConfig.setUrl(last.url);
          requestConfig.setBody(last.body || '');
          requestConfig.setHeaders(
            (last.headers || []).map((header, index) => ({
              id: `header-${index}`,
              key: header.key,
              value: header.value,
            }))
          );
          const newEncoded = encodeRequestToUrl(last);
          updateUrl(`?req=${newEncoded}`);
        }
      } catch {}
    }
  }, [encodedReq, locale]);

  useDebouncedEffect(
    () => {
      const requestToSave: RequestData = {
        method: requestConfig.method,
        url: requestConfig.url,
        headers: requestConfig.headers,
        body: requestConfig.body,
      };
      const encoded = encodeRequestToUrl(requestToSave);
      updateUrl(`?req=${encoded}`);
    },
    [requestConfig.headers, locale],
    100
  );

  useEffect(() => {
    if (response || error) {
      setIsSubmitting(false);
    }
  }, [response, error]);

  const handleSubmit = () => {
    const trimmedUrl = requestConfig.url.trim();
    if (!trimmedUrl) return;

    const variables = getStoredVariables();
    const finalUrl = applyVariables(trimmedUrl, variables);

    try {
      new URL(finalUrl);
    } catch {
      setIsSubmitting(true);
      execute('GET', 'https://httpstat.us/404', [], '').finally(() => {
        setIsSubmitting(false);
      });
      return;
    }

    const finalHeaders = requestConfig.headers
      .filter((header) => header.key.trim() !== '')
      .map((header, index) => ({
        id: `header-${index}`,
        key: applyVariables(header.key, variables),
        value: applyVariables(header.value, variables),
      }));

    const finalBody = applyVariables(requestConfig.body, variables);

    const requestToSave: RequestData = {
      method: requestConfig.method,
      url: requestConfig.url,
      headers: requestConfig.headers,
      body: requestConfig.body,
    };

    saveRequestToHistory(requestToSave);
    const encoded = encodeRequestToUrl(requestToSave);
    updateUrl(`?req=${encoded}`);

    setIsSubmitting(true);
    execute(requestConfig.method, finalUrl, finalHeaders, finalBody).finally(
      () => {
        setIsSubmitting(false);
      }
    );
  };

  const handleReset = () => {
    requestConfig.setMethod('GET');
    requestConfig.setUrl('');
    requestConfig.setBody('');
    updateUrl('');
  };

  return (
    <div className="w-full flex h-full">
      <Sidebar />
      <div className="w-full py-4 px-4 gap-4 flex flex-col">
        <RequestSearch
          method={requestConfig.method}
          setMethod={requestConfig.setMethod}
          url={requestConfig.url}
          setUrl={requestConfig.setUrl}
          onSubmit={handleSubmit}
          onClickReset={handleReset}
          loading={isSubmitting}
        />
        <div className="flex h-full gap-2">
          <RequestPanel
            body={requestConfig.body}
            onBodyChange={requestConfig.setBody}
            headers={requestConfig.headers}
            onHeadersChange={requestConfig.setHeaders}
          />
          <CodeGenPreview
            method={requestConfig.method}
            url={requestConfig.url}
            headers={requestConfig.headers}
            body={requestConfig.body}
          />
          <ResponseViewer
            responseBody={response?.body}
            statusCode={response?.statusCode}
            statusText={response?.statusText}
            headers={response?.headers}
            requestMethod={requestConfig.method}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
