// check status after fetch
export const checkStatus = (response) => {
  if (response.ok) {
    // .ok returns true if response status is 200-299
    return response;
  }
  throw new Error('Request was either a 404 or 500');
}

// convert data into json format
export const json = (response) => response.json()

export const apiFetch = (path) => {
  return fetch(`https://alt-exchange-rate.herokuapp.com/${path}`)
          .then(checkStatus)
          .then(json)
}
