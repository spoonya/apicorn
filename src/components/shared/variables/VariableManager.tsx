'use client';
import { Sidebar } from '@/components';
import { Snippet } from '@heroui/react';
import { Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

type Variable = { key: string; value: string };

export default function VariableManager() {
  const t = useTranslations('Variables');

  const [error, setError] = useState<string | null>(null);

  const [variables, setVariables] = useState<Variable[]>(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('variables');
    return stored ? JSON.parse(stored) : [];
  });
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('variables');
    if (stored) {
      setVariables(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('variables', JSON.stringify(variables));
  }, [variables]);

  const addVariable = () => {
    if (!newKey || !newValue) return;

    const exists = variables.some((v) => v.key === newKey);
    if (exists) {
      setError(`${t('variables')} "${newKey}" ${t('message')}`);
      setTimeout(() => setError(null), 3000);
      return;
    }

    const updated = [...variables, { key: newKey, value: newValue }];
    setVariables(updated);
    localStorage.setItem('variables', JSON.stringify(updated));
    setNewKey('');
    setNewValue('');
  };

  const deleteVariable = (keyToDelete: string) => {
    setVariables((prev) => prev.filter((v) => v.key !== keyToDelete));
  };

  const truncate = (str: string, max: number) =>
    str.length > max ? str.slice(0, max) + '…' : str;

  return (
    <div className="flex h-screen overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 p-10 bg-gradient-to-b from-blue-50 to-white overflow-y-auto min-w-0">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
            {t('variables')}
          </h2>

          <div className="mb-1">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder={t('key')}
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                placeholder={t('value')}
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                onClick={addVariable}
                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {t('add')}
              </button>
            </div>
            <div className="h-8 mt-2 transition-all duration-300 ease-in-out">
              <div
                className={`px-4 py-1 bg-red-100 border border-red-300 text-red-700 text-sm rounded-lg shadow-sm transition-all duration-300 ease-in-out ${
                  error ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                {error || '⠀'}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {variables.map((v) => (
              <div
                key={v.key}
                className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col pr-4 overflow-hidden min-w-0 flex-1">
                    <div className="text-sm text-gray-500">
                      <span
                        className="text-blue-600 font-semibold"
                        title={v.key}
                      >
                        {truncate(v.key, 50)}
                      </span>
                    </div>
                    <div
                      className="text-gray-700 text-sm break-words max-w-full whitespace-normal"
                      title={v.value}
                    >
                      {truncate(v.value, 50)}
                    </div>
                  </div>
                  <Snippet
                    symbol=""
                    color="primary"
                    copyIcon={<Copy size={16} />}
                    tooltipProps={{ content: t('copyVariable') }}
                    classNames={{
                      pre: 'whitespace-pre-wrap break-all',
                    }}
                  >
                    {`{{${v.key}}}`}
                  </Snippet>
                </div>
                <button
                  onClick={() => deleteVariable(v.key)}
                  className="text-red-500 hover:underline text-sm shrink-0 ml-2"
                >
                  {t('delete')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
