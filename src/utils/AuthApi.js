import { mainApiConfig } from './apiConfigs';

class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    return res.json();
  }

  async register(data) {
    const response = await fetch(this._baseUrl + '/signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    });

    return this._getResponseData(response);
  }

  async authorize(email, password) {
    const response = await fetch(this._baseUrl + '/signin', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email: email, password: password }),
    });

    const { token } = await this._getResponseData(response);
    return token;
  }

  async checkToken(token) {
    const response = await fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const {
      data: { name, email },
    } = await this._getResponseData(response);
    return { name: name, email: email };
  }
}

const authApi = new AuthApi(mainApiConfig);

export default authApi;
