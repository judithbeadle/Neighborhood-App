
const api = "https://api.foursquare.com/"
const clientID = '5BHPCSTXB4TZ3HP1XYJYY10OQWPS5ESBZJOBAX54PUWW3NM2'
const clientSecret = '1QAUUEHJBJYTM4DFI5BUCA42KNKA4Y2PYXWE0ISLIOGGG1V3'
const query = 'beer'
const area = '13.3449264%2C52.5376365%2C13.3660388%2C52.54631620000001'
const polygon = 'polygon=52.5462305%2C13.3591175%3B52.543986 %2C13.3549976%3B52.5421329%2C13.3495474%3B52.5405734%2C13.3471977%3B52.5389877%2C13.3451056%3B52.5387006%2C13.3478308%3B52.5396142%2C13.3538604%3B52.5378392%2C13.3610916%3B52.5411281%2C13.368237 %3B52.5462305%2C13.3591175'

// Generate a unique token for storing locations data
let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}


export const getAll = () =>
  fetch(`${api}v2/venues/explore?&client_id=${clientID}&client_secret=${clientSecret}&polygon=${polygon}&query=${query}&v=20180708`)
    .then(res => res.json())
    .then(data => data.response.groups[0].items)


