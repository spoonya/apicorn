import { RequestData } from '@/types/requestData';

const STORAGE_KEY = 'requests';

export function saveRequestToHistory(request: RequestData) {
  const existing = localStorage.getItem(STORAGE_KEY);
  const history: RequestData[] = existing ? JSON.parse(existing) : [];

  history.unshift(request);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, 50)));
}
