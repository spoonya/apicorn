export type Header = {
  key: string;
  value: string;
};

export type RequestData = {
  method: string;
  url: string;
  headers: Header[];
  body?: string;
};
