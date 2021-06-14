const BaseUrl =
  (process.env.REACT_APP_BASE_URL || "") + "http://localhost:3001";

async function fetch(url: string, requestInit?: RequestInit) {
  return window
    .fetch(url, requestInit)
    .then((response: Response) => {
      if (response.status < 200 || response.status >= 300) {
        throw response;
      }

      if (response.status !== 204) {
        return response
          .text()
          .then((body: string) => (body.length > 0 ? JSON.parse(body) : {}));
      }

      return response;
    })
    .catch((err: unknown) => {
      console.error(err);
      throw err;
    });
}

function get<T>(url: string): Promise<T> {
  return fetch(BaseUrl + url, {
    method: "GET",
    headers: jsonHeaders(),
  });
}

function jsonHeaders() {
  return new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });
}

interface GetRatesResponse {
  [currency: string]: number;
}

export const getRates = (): Promise<GetRatesResponse> => {
  return get<GetRatesResponse>("/rates");
};
