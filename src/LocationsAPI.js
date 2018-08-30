
const api = "https://places.cit.api.here.com"
const appID = 'ZVPkzqyqK2EBP6hyfxKR'
const appCode = 'N0JN1UWoTXqfNVuwdwhONw'
const acceptLanguage = 'en-US%2Cen%3Bq%3D0.9%2Cde%3Bq%3D0.8'
const q = 'drink'
const area = '52.5417%2C13.3571%3Br%3D450'

// Generate a unique token for storing locations data
let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAll = () =>
  fetch(`${api}/places/v1/autosuggest?q=${q}&in=${area}&Accept-Language=${acceptLanguage}&app_id=${appID}&app_code=${appCode}`)
    .then(res => res.json())
    .then(data => data.results)
/*
export const getLocationDetails = (locationId)=> {
  fetch(`${api}v2/venues/explore?&client_id=${clientID}&client_secret=${clientSecret}&polygon=${polygon}&query=${query}&v=20180708`)
  

*/
