'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

import { useKeyValueList } from '@/hooks';
import { KeyValue } from '@/types';
import { Button } from '@heroui/react';

import { RequestKeyValueItem } from './RequestKeyValueItem';

interface RequestHeadersTabProps {
  headers: KeyValue[];
  setHeaders: (headers: KeyValue[]) => void;
}

export const RequestHeadersTab = ({
  headers,
  setHeaders,
}: Readonly<RequestHeadersTabProps>) => {
  const t = useTranslations('RestClient');
  const initialized = useRef(false);
  const { items, addItem, removeItem, updateItem, setItems } =
    useKeyValueList();

  useEffect(() => {
    if (!initialized.current && headers.length > 0) {
      initialized.current = true;
      setItems(headers);
    }
  }, [headers, setItems]);

  useEffect(() => {
    setHeaders(items);
  }, [items]);

  return (
    <div className="flex flex-col gap-3 rounded-medium bg-content1 p-3 shadow-sm">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-foreground/80">
          {t('headers')}
        </span>
        <Button
          size="sm"
          color="primary"
          variant="flat"
          startContent={<Plus size={16} className="text-current" />}
          className="hover:bg-primary/20 text-[14px]"
          onPress={addItem}
        >
          {t('addHeader')}
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        {items.length === 0 ? (
          <div className="flex-center h-24 text-foreground/40 text-sm">
            {t('headersEmpty')}
          </div>
        ) : (
          items.map((item, index) => (
            <RequestKeyValueItem
              key={item.id}
              item={item}
              index={index}
              updateItem={updateItem}
              removeItem={removeItem}
            />
          ))
        )}
      </div>
    </div>
  );
};
