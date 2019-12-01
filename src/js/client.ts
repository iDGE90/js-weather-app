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
    return this.getUrl(`find?lat=${lat}&lon=${lon}&cnt=${cnt}`);
  }

  getLocationByIdUrl(id: string): string {
    return this.getUrl(`weather?id=${id}`);
  }
  
  getForecastUrl(id: string): string {
    return this.getUrl(`forecast?id=${id}`);
  }

  getImageUrl(icon: string, double = false): string {
    return this.imageUri + icon + (double ? '@2x' : '') + '.png';
  }

  getSearchLocationUrl(q: string): string {
    return this.getUrl(`find?q=${q}&type=like`);
  }

  // Get full url for request
  getUrl(uri: string): string {
    return this.baseUri + uri + this.keyAndUnits;
  }

  // Get application key and units (imperial/metric)
  get keyAndUnits(): string {
    return `&appid=${this.appKey}&units=${this.units}`;
  }

}