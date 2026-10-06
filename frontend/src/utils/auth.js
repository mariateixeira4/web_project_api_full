const BASE_URL = "/api";

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return res.text().then((text) => {
      return Promise.reject(`Error: ${res.status} - ${text}`);
    });
  });
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return res.text().then((text) => {
      return Promise.reject(`Error: ${res.status} - ${text}`);
    });
  });
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }

    return res.text().then((text) => {
      return Promise.reject(`Error: ${res.status} - ${text}`);
    });
  });
}
