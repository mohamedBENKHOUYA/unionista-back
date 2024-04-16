import axios from 'axios';

export class HttpService {
  async post<T>(
    url: string,
    body: any = {},
    queryParams?: Record<string, string>,
  ) {
    return axios.post<T>(this._addQueryParams(url, queryParams), body);
  }

  private _addQueryParams(
    path: string,
    queryParamsObj: Record<string, any> = {},
  ) {
    /**
     * remove trailing/leading slashes
     */
    path = path.replace(/(^\/|\/$)/g, '');
    const keys = Object.keys(queryParamsObj);
    const queryParams = new URLSearchParams();

    for (const key of keys) {
      queryParams.append(
        key,
        Array.isArray(queryParamsObj[key])
          ? JSON.stringify(queryParamsObj[key])
          : queryParamsObj[key],
      );
    }
    return `${path}?${queryParams.toString()}`;
  }
}
