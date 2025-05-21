export function buildHeadersObject(
  headers: Array<{ key: string; value: string }>
): Record<string, string> {
  return headers.reduce(
    (acc, header) => {
      if (header.key.trim() !== '') {
        acc[header.key] = header.value;
      }
      return acc;
    },
    {} as Record<string, string>
  );
}
