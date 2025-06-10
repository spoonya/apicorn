'use client';

import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';

import { requestMethods } from '@/services';
import { HttpMethod } from '@/types';
import { cn } from '@/utils';
import { Button, Input, Select, SelectItem } from '@heroui/react';

interface RequestSearchProps {
  className?: string;
  method: HttpMethod;
  url: string;
  setMethod: Dispatch<SetStateAction<HttpMethod>>;
  setUrl: (value: string) => void;
  onSubmit: () => void;
  onClickReset: () => void;
  loading: boolean;
}

export const RequestSearch = ({
  className,
  method,
  url,
  setMethod,
  setUrl,
  onSubmit,
  onClickReset,
  loading,
}: Readonly<RequestSearchProps>) => {
  const t = useTranslations('RestClient');

  return (
    <div className={cn(className)}>
      <div className="flex gap-2 items-center">
        <Select
          classNames={{ trigger: 'bg-default-50 border-1 border-gray-200' }}
          aria-label="Select HTTP method"
          className="w-40"
          items={requestMethods}
          selectedKeys={[method]}
          onChange={(e) => setMethod(e.target.value as HttpMethod)}
          disallowEmptySelection
          disabled={loading}
        >
          {requestMethods.map((methodItem) => (
            <SelectItem key={methodItem.value} textValue={methodItem.label}>
              {methodItem.label}
            </SelectItem>
          ))}
        </Select>

        <Button color="danger" onPress={onClickReset} disabled={loading}>
          {t('Clear')}
        </Button>

        <Input
          classNames={{
            inputWrapper: 'bg-default-50 border-1 border-gray-200',
          }}
          aria-label="Request URL"
          placeholder="https://your-api.com/endpoint"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
          disabled={loading}
        />

        <Button
          color="primary"
          onPress={onSubmit}
          isLoading={loading}
          disabled={loading}
        >
          {t('submit')}
        </Button>
      </div>
    </div>
  );
};
