/**
 * Fast HTTP library
 * Library for HTTP Requests
 *
 * @version 3.0.0
 * @author Ruan Gross
 * @license MIT
 */

class fastHTTP {
    // Make an HTTP GET Request
    async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }
    // make an HTTP POST Request
    async post(url, data) {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }
    // make an HTTP PUT Request
    async put(url, data) {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json;
        return resData;
    }
    // make an HTTP DELETE Request
    async delete(url) {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        });
        const resData = await "Deleted..";
        return resData;
    }
}
