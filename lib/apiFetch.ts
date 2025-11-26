export async function apiFetch<T = any>(url: string, options?: {
  method?: string;
  body?: string | Record<string, string | number | boolean>;
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

  let fetchUrl = url;
  if (typeof window === "undefined" && url.startsWith("/")) {
    const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    fetchUrl = base + url;
  }

  const res = await fetch(fetchUrl, fetchOptions);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  const result = await res.json();
  
  if (!result.success) {
    throw new Error(result.error || 'API error');
  }

  return result.data;
}
