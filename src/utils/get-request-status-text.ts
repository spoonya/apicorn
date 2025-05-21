export const getRequestStatusText = (statusCode: number): string => {
  const statusMessages: Record<number, string> = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    401: 'Unauthorized',
    404: 'Not Found',
    500: 'Internal Server Error',
  };
  return statusMessages[statusCode] || 'Unknown Status';
};
