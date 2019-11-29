/** A base class to send queries to the backend. */
export class ApiClient {

    HOST = 'http://192.168.1.190:8080/randomeal/v1/';

    get(url) {
        return fetch(this.HOST + url)
            .then(response => response.json())
            .catch((error) => {
                console.log('Problems with GET method: ' + error.message)
            });
    }

    post(url, body) {
        return fetch(this.HOST + url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .catch((error) => {
                console.log('Problems with POST method: ' + error.message)
            });
    }
}
