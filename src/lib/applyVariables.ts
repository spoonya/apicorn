export const applyVariables = (
  input: string,
  variables: Record<string, string>
): string => {
  return input.replace(/{{(.*?)}}/g, (_, key) => variables[key.trim()] ?? '');
};
