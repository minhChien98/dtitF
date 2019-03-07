function parseJSON(response) {
    if (response.status === 204 || response.status === 205) {
      return null;
    }
    // console.log(response.json());
    // response.json().then(result => {
    //   // if(result.data.error_cod)
    // });
    return response.json();
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
}

const error = new Error(response.statusText);
    error.response = response;
    throw error;
}
export default function request(url, options) {
    const newHeaders = Object.assign(
        {
        'Content-Type': 'application/json',
        },
        options.headers,
    );
    options.headers = newHeaders;
    options.credentials = 'include';

    return fetch(url, options)
        .then(checkStatus)
        .then(parseJSON);
}  