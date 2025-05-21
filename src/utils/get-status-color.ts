export const getStatusColor = (statusCode: number) => {
  if (!statusCode) return 'bg-default-100 text-default-800';
  if (statusCode >= 200 && statusCode < 300)
    return 'bg-success-100 text-success-800';
  if (statusCode >= 300 && statusCode < 400)
    return 'bg-warning-100 text-warning-800';
  if (statusCode >= 400 && statusCode < 500)
    return 'bg-danger-100 text-danger-800';
  return 'bg-error-100 text-error-800';
};
