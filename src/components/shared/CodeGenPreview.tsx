'use client';

import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import codegen from 'postman-code-generators';
import { Request } from 'postman-collection';
import React, { useEffect, useState } from 'react';
import { applyVariables } from '@/lib/applyVariables';
import { getStoredVariables } from '@/lib/getStoredVariables';
import { HttpMethod, KeyValue, LanguageGroup } from '@/types';
import { cn } from '@/utils';
import { Select, SelectItem, Snippet } from '@heroui/react';

interface CodeGenPreviewProps {
  className?: string;
  url: string;
  method: HttpMethod;
  body: string;
  headers: KeyValue[];
}

export const CodeGenPreview = ({
  className,
  url,
  method,
  body,
  headers,
}: Readonly<CodeGenPreviewProps>) => {
  const t = useTranslations('RestClient');
  const [snippet, setSnippet] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('curl-cURL');
  const [language, variant] = selected.split('-');

  useEffect(() => {
    setLoading(true);
    setError(null);
    setSnippet('');
    const variables = getStoredVariables();

    const finalUrl = applyVariables(url, variables);
    const finalHeaders = headers.map((h) => ({
      key: applyVariables(h.key, variables),
      value: applyVariables(h.value, variables),
    }));
    const finalBody = applyVariables(body, variables);

    const request = new Request({
      url: finalUrl,
      method,
      header: finalHeaders.filter((h) => h.key && h.value),
      body:
        finalBody && method !== 'GET'
          ? {
              mode: 'raw',
              raw: finalBody,
            }
          : undefined,
    });

    const options = {
      indentCount: 2,
      indentType: 'Space',
      trimRequestBody: true,
      followRedirect: true,
    };

    codegen.convert(
      language,
      variant,
      request,
      options,
      (err: Error, generatedCode: string) => {
        if (err) {
          setError(err.toString());
        } else {
          setSnippet(generatedCode);
        }
        setLoading(false);
      }
    );
  }, [language, variant, url, method, body, headers]);

  const languageGroups: LanguageGroup[] = codegen.getLanguageList();

  return (
    <div
      className={cn(
        className,
        'flex flex-col gap-7 p-4 bg-default-50 rounded-xl shadow-sm border-1 border-gray-200 min-w-96 max-w-96'
      )}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-sm font-semibold text-foreground/80 mr-3">
          {t('genCode')}
        </h2>
        <div className="flex gap-2">
          <Select
            aria-label="Select language"
            size="sm"
            classNames={{ trigger: 'bg-white border-1 border-gray-200' }}
            className="w-[175px]"
            selectedKeys={[selected]}
            disallowEmptySelection
            onChange={(e) => setSelected(e.target.value)}
          >
            {languageGroups.map((group: LanguageGroup) => (
              <React.Fragment key={`group-${group.key}`}>
                <SelectItem
                  key={`header-${group.key}`}
                  textValue={group.label}
                  className="text-sm font-bold pt-2 pb-1"
                  isDisabled
                >
                  <span className="text-foreground/70">{group.label}</span>
                </SelectItem>
                {group.variants.map((variant: { key: string }) => (
                  <SelectItem
                    key={`${group.key}-${variant.key}`}
                    textValue={`${group.label} (${variant.key})`}
                    className="text-sm pl-4"
                  >
                    {variant.key}
                  </SelectItem>
                ))}
              </React.Fragment>
            ))}
          </Select>
        </div>
      </div>

      <div className="h-max text-foreground rounded-lg overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full text-foreground/50">
            Generating...
          </div>
        ) : error ? (
          <div className="text-destructive text-sm">Error: {error}</div>
        ) : (
          <Snippet
            color="primary"
            copyIcon={<Copy size={16} />}
            tooltipProps={{ content: t('copySnippet') }}
            classNames={{
              pre: 'whitespace-pre-wrap break-all',
            }}
          >
            {snippet}
          </Snippet>
        )}
      </div>
    </div>
  );
};
