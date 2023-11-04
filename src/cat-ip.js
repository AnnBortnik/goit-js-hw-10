import axios from "axios";

const url = 'https://api.thecatapi.com/v1'
const api = 'live_YrfYGEHNA8N3nX852nNPKSzvzLwz7f4bTcGBWsfiVqLEhyZTeZgx75PJORzmVMpc'

axios.defaults.headers.common["x-api-key"] = `${api}`;

export function fetchBreeds() {
    return fetch('https://api.thecatapi.com/v1/breeds')
    
    .then(resp => {
        if (!resp.ok) {
            throw new Error(response.status);
        }
        return resp.json()
    })
}

export function fetchCat(breadID) {
    return fetch(`${url}/images/search?api_key=${api}&breed_ids=${breadID}`)

    .then(resp => {
        if (!resp.ok) {
            throw new Error(response.status);
        }
        return resp.json()
    })

}