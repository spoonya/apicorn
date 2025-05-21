'use client';

import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ChangeEvent } from 'react';
import { COMMON_HEADERS } from '@/data/commonHeaders';
import { COMMON_HEADER_VALUES } from '@/data/commonHeaderValues';
import { KeyValue } from '@/types';
import { Button, Input } from '@heroui/react';

interface RequestKeyValueItemProps {
  item: KeyValue;
  index: number;
  updateItem: (id: string, key: string, value: string) => void;
  removeItem: (id: string) => void;
}

export const RequestKeyValueItem = ({
  item,
  index,
  updateItem,
  removeItem,
}: RequestKeyValueItemProps) => {
  const t = useTranslations('RestClient');

  const filterLatin = (value: string) =>
    value.replace(/[^a-zA-Z0-9\-_/ ]/g, '');

  const handleKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filtered = filterLatin(e.target.value);
    updateItem(item.id, filtered, item.value);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filtered = filterLatin(e.target.value);
    updateItem(item.id, item.key, filtered);
  };

  return (
    <div className="flex items-center gap-2 w-full relative">
      <div className="w-full">
        <Input
          aria-label={`Header key ${index + 1}`}
          placeholder={t('key')}
          value={item.key}
          list="common-headers"
          onChange={handleKeyChange}
          classNames={{
            input: 'text-sm',
          }}
        />

        <datalist id="common-headers">
          {COMMON_HEADERS.map((header) => (
            <option key={header} value={header} />
          ))}
        </datalist>
      </div>

      <Input
        aria-label={`Header value ${index + 1}`}
        placeholder={t('value')}
        value={item.value}
        list="common-header-values"
        onChange={handleValueChange}
        classNames={{
          input: 'text-sm',
        }}
      />
      <datalist id="common-header-values">
        {COMMON_HEADER_VALUES.map((value) => (
          <option key={value} value={value} />
        ))}
      </datalist>
      <Button
        isIconOnly
        size="sm"
        variant="light"
        aria-label={`Remove header ${index + 1}`}
        onPress={() => removeItem(item.id)}
      >
        <Trash2 size={16} className="text-danger" />
      </Button>
    </div>
  );
};
