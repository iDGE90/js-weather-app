const BASE_URI = 'https://api.openweathermap.org/data/2.5/';
const APP_KEY = 'a83509480d3c4dbd72473b52e52c59ab';
const UNITS = 'metric';

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
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(JSON.parse(xhr.statusText));
      }
    };

    xhr.onerror = () => reject(JSON.parse(xhr.statusText));

    xhr.send(obj.body);
  });
}

// Get url for location around Bitola
export function getLocationsUrl(lat = 41.03, lon = 21.34, cnt = 25) {
  return BASE_URI + `find?lat=${lat}&lon=${lon}&cnt=${cnt}${getKeyAndUnits()}`;
}

// Get app key and units
function getKeyAndUnits() {
  return `&appid=${APP_KEY}&units=${UNITS}`;
}