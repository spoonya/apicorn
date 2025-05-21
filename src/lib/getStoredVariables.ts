export const getStoredVariables = (): Record<string, string> => {
  const raw = localStorage.getItem('variables');
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as { key: string; value: string }[];
    return Object.fromEntries(parsed.map((v) => [v.key, v.value]));
  } catch {
    return {};
  }
};
