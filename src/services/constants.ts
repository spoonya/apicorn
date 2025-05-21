import { EditorModeOption, Locale } from '@/types';

export enum AppRoutes {
  HOME = '/',
  HISTORY = '/history',
  REST = '/rest-client',
  VARS = '/variables',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
}

export const locales = ['en', 'ru'] as const;

export const requestMethods = [
  {
    value: 'GET',
    label: 'GET',
  },
  {
    value: 'POST',
    label: 'POST',
  },
  {
    value: 'PUT',
    label: 'PUT',
  },
  {
    value: 'DELETE',
    label: 'DELETE',
  },
  {
    value: 'PATCH',
    label: 'PATCH',
  },
  {
    value: 'HEAD',
    label: 'HEAD',
  },
  {
    value: 'OPTIONS',
    label: 'OPTIONS',
  },
] as const;

export enum requestTabs {
  HEADERS = 'Headers',
  BODY = 'Body',
}

export enum ResponseTabs {
  DETAILS = 'Request',
  BODY = 'Response',
}

export const editorModes: EditorModeOption[] = [
  {
    value: 'json',
    label: 'JSON',
  },
  {
    value: 'plaintext',
    label: 'Raw',
  },
];

export const languageNames: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
};
