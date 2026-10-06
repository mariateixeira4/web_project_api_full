class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _getHeaders() {
    const token = localStorage.getItem("jwt");

    return {
      "Content-Type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    };
  }

  _request(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: this._getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return res.text().then((text) => {
        return Promise.reject(`Error: ${res.status} - ${text}`);
      });
    });
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`).then(
      (response) => response.data,
    );
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`).then(
      (response) => response.data,
    );
  }

  getAppData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  updateUserInfo(data) {
    return this.updateProfile(data);
  }

  updateProfile(data) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((response) => response.data);
  }

  addCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((response) => response.data);
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
    }).then((response) => response.data);
  }

  unlikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
    }).then((response) => response.data);
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked ? this.likeCard(cardId) : this.unlikeCard(cardId);
  }

  updateAvatar(data) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((response) => response.data);
  }
}

const api = new Api({
  baseUrl: "/api",
});

export default api;
