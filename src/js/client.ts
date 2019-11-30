export default class Client {

  baseUri = 'https://api.openweathermap.org/data/2.5/';

  appKey = 'a83509480d3c4dbd72473b52e52c59ab';

  units = 'metric';

  imageUri = 'https://openweathermap.org/img/wn/';

  request(obj: any): Promise<any> {
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

  getLocationsUrl(lat = 41.03, lon = 21.34, cnt = 25) {
    return this.baseUri + `find?lat=${lat}&lon=${lon}&cnt=${cnt}${this.keyAndUnits}`;
  }

  getLocationByIdUrl(id) {
    return this.baseUri + `weather?id=${id}${this.keyAndUnits}`;
  }
  
  getForecastUrl(id) {
    return this.baseUri + `forecast?id=${id}${this.keyAndUnits}`;
  }

  getImageUrl(icon, double = false) {
    return this.imageUri + icon + (double ? '@2x' : '') + '.png';
  }

  getSearchLocationUrl(q) {
    return this.baseUri + `find?q=${q}&type=like${this.keyAndUnits}`;
  }

  get keyAndUnits(): string {
    return `&appid=${this.appKey}&units=${this.units}`;
  }

}