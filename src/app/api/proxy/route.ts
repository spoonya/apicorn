import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { url, method, headers, body } = await req.json();

  const filteredHeaders: Record<string, string> = {};
  Object.entries(headers || {}).forEach(([key, value]) => {
    if (typeof value === 'string') {
      filteredHeaders[key] = value;
    }
  });

  delete filteredHeaders['accept-encoding'];

  const fetchOptions: RequestInit = {
    method,
    headers: filteredHeaders,
    body: method !== 'GET' ? body : undefined,
  };

  try {
    const res = await fetch(url, fetchOptions);
    const text = await res.text();

    return new NextResponse(text, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('content-type') || 'text/plain',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Proxy fetch failed', details: String(error) },
      { status: 500 }
    );
  }
}
