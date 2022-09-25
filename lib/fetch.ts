export async function Fetch<T>(url: string, query: Record<string, any>): Promise<T | {error: string}> {
  const queryURI = Object.entries(query)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  return fetch(url + '?' + queryURI).then((res) => res.json());
}
