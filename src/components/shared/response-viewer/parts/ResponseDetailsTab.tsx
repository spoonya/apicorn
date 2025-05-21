'use client';

import { useTranslations } from 'next-intl';

import { getStatusColor } from '@/utils';

interface ResponseDetailsTabProps {
  statusCode?: number;
  statusText?: string;
  headers: Array<{ key: string; value: string }>;
}

export const ResponseDetailsTab = ({
  statusCode,
  statusText,
  headers,
}: Readonly<ResponseDetailsTabProps>) => {
  const t = useTranslations('RestClient');

  return (
    <div className="flex flex-col gap-3 rounded-medium bg-content1 p-3 shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">{t('status')}</h3>
          <div className="flex gap-2 items-center">
            {statusCode ? (
              <span
                className={`px-2 py-1 rounded-md text-sm ${getStatusColor(statusCode)}`}
              >
                {statusCode} {statusText}
              </span>
            ) : (
              <span className="text-foreground/50">{t('noStatus')}</span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">{t('headers')}</h3>
          {headers.length > 0 ? (
            <div className="flex flex-col gap-2">
              {headers.map((header, index) => (
                <div key={index} className="flex gap-4 items-center text-sm">
                  <span className="text-foreground/70">{header.key}:</span>
                  <span className="text-foreground/90">{header.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <span className="text-foreground/50">{t('headersEmpty')}</span>
          )}
        </div>
      </div>
    </div>
  );
};
