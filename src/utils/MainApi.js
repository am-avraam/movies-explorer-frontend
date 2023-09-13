import { mainApiConfig } from './apiConfigs';
class MainApi {
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

  getSavedMovies = async () => {
    const response = await fetch(this._baseUrl + '/movies', {
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    return this._getResponseData(response);
  };

  async postMovie(data) {
    const response = await fetch(this._baseUrl + '/movies', {
      method: 'POST',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(data),
    });

    return this._getResponseData(response);
  }

  patchUser = async (newInfo) => {
    const response = await fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify(newInfo),
    });

    return this._getResponseData(response);
  };

  deleteMovie = async (movieId) => {
    const response = await fetch(this._baseUrl + `/movies/${movieId}`, {
      method: 'DELETE',
      headers: { ...this._headers, authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    return this._getResponseData(response);
  };
}

const mainApi = new MainApi(mainApiConfig);

export default mainApi;
