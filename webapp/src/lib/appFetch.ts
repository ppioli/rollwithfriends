export const ServerUrl = "http://localhost:5289";

let _token: string = undefined;

export function setToken(t: string) {
  _token = t;
}

type SupportedMethods = "POST" | "GET";

function buildHeaders(token?: string) {
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export const getDefaultHeaders = () => buildHeaders(_token);

interface AppFetchOps {
  url: string;
  base?: string;
  method: SupportedMethods;
  payload?: object;
}

export const appFetch = async ({
  base = ServerUrl,
  url,
  method,
  payload,
}: AppFetchOps) => {
  // Fetch data from GitHub's GraphQL API:
  const headers = getDefaultHeaders();

  headers["Content-Type"] = "application/json";

  if (method == "GET" && payload) {
    throw new Error("Not implemented");
  }
  const body = !payload ? undefined : JSON.stringify(payload);

  const response = await fetch(new URL(url, base).toString(), {
    method: method,
    headers,
    body,
  });

  // Get the response as JSON
  return await response.json();
};
