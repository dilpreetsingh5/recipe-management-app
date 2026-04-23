type TokenGetter = () => Promise<string | null>;

let currentTokenGetter: TokenGetter = async () => null;

export const setClerkTokenGetter = (tokenGetter: TokenGetter) => {
  currentTokenGetter = tokenGetter;
};

const buildHeaders = (headers?: HeadersInit): Headers => {
  if (headers instanceof Headers) {
    return new Headers(headers);
  }

  return new Headers(headers ?? {});
};

export const getClerkToken = async (): Promise<string | null> => {
  return await currentTokenGetter();
};

export const authFetch = async (
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> => {
  const headers = buildHeaders(init.headers);
  const token = await getClerkToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(input, {
    ...init,
    headers,
  });
};
