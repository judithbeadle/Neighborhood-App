
const api = "https://places.cit.api.here.com"
const appID = 'ZVPkzqyqK2EBP6hyfxKR'
const appCode = 'N0JN1UWoTXqfNVuwdwhONw'
const acceptLanguage = 'en-US%2Cen%3Bq%3D0.9%2Cde%3Bq%3D0.8'
const q = 'drink'
const area = '13.3449264%2C52.5376365%2C13.3660388%2C52.54631620000001'


// Generate a unique token for storing locations data
let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/* get data from 
https://places.cit.api.here.com/places/v1/
autosuggest
?q=drink
&in=
&Accept-Language=
&app_id=
&app_code=


export const get = (locationId) =>
  fetch(`${api}?q=${q}/locations/${locationId}`, { headers })
    .then(res => res.json())
    .then(data => data.location)


*/

export const getAll = () =>
  fetch(`${api}/places/v1/autosuggest?q=drink&in=52.5417%2C13.3571%3Br%3D450&Accept-Language=en-US%2Cen%3Bq%3D0.9%2Cde%3Bq%3D0.8&app_id=${appID}&app_code=${appCode}`)
    .then(res => res.json())
    .then(data => data.results)

/*

export const search = (query) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }).then(res => res.json())
    .then(data => data.locations)
*/
