const BASE_URI = 'https://api.openweathermap.org/data/2.5/';
const APP_KEY = 'a83509480d3c4dbd72473b52e52c59ab';
const UNITS = 'metric';

const IMAGE_URI = 'https://openweathermap.org/img/wn/';

export function request(obj) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open(obj.method || "GET", obj.url);

    if (obj.headers) {
      Object.keys(obj.headers).forEach(key => {
        xhr.setRequestHeader(key, obj.headers[key]);
      });
    }

    xhr.onload = () => {
      xhr.status >= 200 && xhr.status < 300
        ? resolve(JSON.parse(xhr.response))
        : reject(JSON.parse(xhr.response));
    };

    xhr.onerror = () => reject(xhr.response);

    xhr.send(obj.body);
  });
}

// Get url for locations around Bitola
export function getLocationsUrl(lat = 41.03, lon = 21.34, cnt = 25) {
  return BASE_URI + `find?lat=${lat}&lon=${lon}&cnt=${cnt}${getKeyAndUnits()}`;
}

// Get url for locations around Bitola
export function getSearchLocationUrl(q) {
  return BASE_URI + `weather?q=${q}${getKeyAndUnits()}`;
}

// Get url for location by id
export function getLocationByIdUrl(id) {
  return BASE_URI + `weather?id=${id}${getKeyAndUnits()}`;
}

// Get url for weather icon
export function getImageUrl(icon, double = false) {
  return IMAGE_URI + icon + (double ? '@2x' : '') + '.png';
}

// Get app key and units
function getKeyAndUnits() {
  return `&appid=${APP_KEY}&units=${UNITS}`;
}