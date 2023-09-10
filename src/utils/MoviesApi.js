import { moviesApiConfig } from './apiConfigs';
class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getMovies = async () => {
    const response = await fetch(this._baseUrl, {
      headers: this._headers,
    });

    return this._getResponseData(response);
  };
}

const movieApi = new MoviesApi(moviesApiConfig);

export default movieApi;
