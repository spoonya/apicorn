'use client';

import { Sidebar } from '@/components';
import { AppRoutes } from '@/services';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { encodeRequestToUrl } from '@/utils/urlParams';
import { RequestData } from '@/types/requestData';
import { useTranslations } from 'next-intl';

export default function HistoryPage() {
  const t = useTranslations('History');

  const [history, setHistory] = useState<RequestData[] | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('requests');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHistory(parsed);
      } catch {
        setHistory([]);
      }
    } else {
      setHistory([]);
    }
  }, []);

  const handleClearHistory = () => {
    localStorage.removeItem('requests');
    setHistory([]);
  };

  if (history === null) return null;

  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white overflow-y-auto min-w-0 p-10">
        {history.length === 0 ? (
          <div className="max-w-md w-full space-y-4 text-center mx-auto mt-20">
            <h1 className="text-2xl font-semibold">{t('noHistory')}</h1>
            <p className="text-gray-500">{t('message')}</p>
            <p>
              <Link href={AppRoutes.REST}>
                <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                  {t('goToClient')}
                </span>
              </Link>
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">{t('history')}</h1>
              <button
                onClick={handleClearHistory}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                {t('delete')}
              </button>
            </div>

            {history.map((entry, index) => {
              const encoded = encodeRequestToUrl(entry);
              return (
                <Link
                  key={index}
                  href={`${AppRoutes.REST}?req=${encoded}`}
                  className="block border border-gray-300 rounded-lg p-4 hover:shadow-md transition bg-white"
                >
                  <div className="font-medium text-blue-600">
                    {entry.method}
                  </div>
                  <div className="text-gray-800 truncate">{entry.url}</div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
