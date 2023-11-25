class Api {
    #url;
    #headers;

    constructor({url, headers}) {
        this.#url = url;
        this.#headers = headers;
    }

    _sendRequest(url, options) {
        return fetch(url, options)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Что-то пошло не так...')
            })
    }

    getCards() {
        return this._sendRequest(`${this.#url}/cards`, {
            method: "GET",
            headers: this.#headers,
        });
    }

    getUser() {
        return this._sendRequest(`${this.#url}/users/me`, {
            method: "GET",
            headers: this.#headers,
        });
    }

    patchUser(data) {
        return this._sendRequest(`${this.#url}/users/me`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        });
    }

    postCard(data) {
        return this._sendRequest(`${this.#url}/cards`, {
            method: 'POST',
            headers: this.#headers,
            body: JSON.stringify({
                name: data.title,
                link: data.link
            })
        })
    }

    deleteCard(id) {
        return this._sendRequest(`${this.#url}/cards/${id}`, {
            method: 'DELETE',
            headers: this.#headers,
        });
    }

    likeCard(id) {
        return this._sendRequest(`${this.#url}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this.#headers,
        });
    }

    deleteLikeCard(id) {
        return this._sendRequest(`${this.#url}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this.#headers,
        });
    }

    patchAvatar(data) {
        return this._sendRequest(`${this.#url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        });
    }
}

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-75',
    headers: {
        authorization: '8f0f3959-562a-4d67-8672-647db07d1306',
        'Content-Type': "application/json"
    }
});

export default api;