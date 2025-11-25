export async function apiFetch<T = any>(url: string, options?: {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}): Promise<T> {
  const { method = "GET", body, headers = {} } = options || {};
  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };
  
  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }
  
  const res = await fetch(url, fetchOptions);
 
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
