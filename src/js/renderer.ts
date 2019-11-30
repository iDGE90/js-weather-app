import Client from "./client";

export default class Renderer {

  contentEl = document.getElementById('content');
  contentTitleEl = document.getElementById('content_title');

  client: Client;

  constructor() {
    this.client = new Client();
  }

  renderLocations(locations = []) {
    this.renderTable(locations);
    this.renderContentTitle('Showing weather information for locations around Bitola.');
  }

  renderSingleLocation(location) {
    this.renderContentTitle();
    this.renderLocation(location);
  }

  renderSearchResult(locations) {
    this.renderTable(locations);
    this.renderContentTitle(locations.length > 0 ? `We found ${locations.length} locations.` : `We did't find any locations.`);
  }

  renderError(error, q = '') {
    switch (error.cod) {
      case '404':
        this.renderContentTitle(`No location result for: ${q}.`);
        break;
      default:
        this.renderContentTitle(`Error: ${error.message}.`, true);
    }
  
    this.renderTable();
  }

  private renderTable(locations = []): void {
    let tableRows = '';

    locations.forEach((location) => {
      tableRows +=
        `<tr class="text-xs bg-white odd:bg-gray-100">
          <td class="px-3 py-2">
            <a href="/location/${location.id}" class="anchor">${location.name} (${location.sys.country})</a>
          </td>
          <td class="px-3 py-2">${location.weather[0].main}</td>
          <td class="px-3 py-2">${location.wind.speed} km/h</td>
          <td class="px-3 py-2">${location.main.humidity} %</td>
          <td class="px-3 py-2 text-right">
            <span class="font-bold">${this.roundDegrees(location.main.temp)}</span>
            <span> &deg;C</span>
          </td>
        </tr>`;
    });

    this.contentEl.innerHTML =
      `<table class="w-full">
        <thead>
          <tr>
            <td class="px-3 py-1 pb-2 w-full" style="min-width: 200px">Location</td>
            <td class="px-3 py-1 pb-2" style="min-width: 125px">Weather</td>
            <td class="px-3 py-1 pb-2" style="min-width: 125px">Wind</td>
            <td class="px-3 py-1 pb-2" style="min-width: 75px">Humidity</td>
            <td class="px-3 py-1 pb-2 text-right" style="min-width: 100px">Temp</td>
          </tr>
        </thead>
        <tbody class="">${tableRows}</tbody>
      </table>`;

    // this.router.addListenersOnAnchors(this.contentEl.getElementsByTagName('a'));

    this.contentEl.style.display = locations.length > 0 ? null : 'none';
  }

  private renderLocation(location = null) {
    this.contentEl.innerHTML =
      `<div>
        <div class="text-center text-3xl">${location.name} (${location.sys.country})</div>
        <div class="text-center text-xs mb-5 sm:mb-10">${this.getDate(location.dt)}h -  (GMT ${this.getGmt(location.timezone)})</div>
  
        <div class="block sm:flex">
          <div class="w-full sm:w-1/3 mb-10 sm:mb-0">
            <div class="text-center border-b">
              <img class="-my-4 mx-auto" src="${this.client.getImageUrl(location.weather[0].icon, true)}" alt="${location.weather[0].main}" title="${location.weather[0].main}">
              <div class="pb-3">
                <span class="text-4xl font-bold">${this.roundDegrees(location.main.temp)}</span>
                <span class="text">&deg;C</span>
              </div>
            </div>
            <div class="flex flex-row border-b">
              <div class="flex-1 text-center py-2 border-r">
                <div class="text-gray-600 text-xs uppercase" style="font-size: 0.65rem;">min</div>
                <div>
                  <span class="font-medium">${this.roundDegrees(location.main.temp_min)}</span>
                  <span class="text-xs"> &deg;C</span>
                </div>
              </div>
              <div class="flex-1 text-center py-2">
                <div class="text-gray-600 text-xs uppercase" style="font-size: 0.65rem;">max</div>
                <div>
                  <span class="font-medium">${this.roundDegrees(location.main.temp_max)}</span>
                  <span class="text-xs"> &deg;C</span>
                </div>
              </div>
            </div>
            <div class="border-b p-2 flex justify-between items-center">
              <div class="text-gray-600 text-xs uppercase">Humidity</div>
              <div class="text-sm">
                <span class="font-medium">${location.main.humidity}</span>
                <span class="text-xs text-gray-600"> %</span>
              </div>
            </div>
            <div class="border-b p-2 flex justify-between items-center">
              <div class="text-gray-600 text-xs uppercase">Pressure</div>
              <div class="text-sm">
                <span class="font-medium">${location.main.pressure}</span>
                <span class="text-xs text-gray-600"> hPa</span>
              </div>
            </div>
            <div class="border-b p-2 flex justify-between items-center">
              <div class="text-gray-600 text-xs uppercase">Wind</div>
              <div class="text-sm">
                <div>
                  <span class="font-medium">${location.wind.speed}</span>
                  <span class="text-xs text-gray-600"> km/h</span>
                </div>
                <div class="text-right">
                  <span class="font-medium">${location.wind.deg || '0'}</span>
                  <span class="text-xs text-gray-600"> &deg;</span>
                </div>
              </div>
            </div>
            <div class="border-b p-2 flex justify-between items-center">
              <div class="text-gray-600 text-xs uppercase">Sunrise</div>
              <div class="text-sm">
                <span class="font-medium">${this.getDate(location.sys.sunrise)}</span>
                <span class="text-xs text-gray-600"> h</span>
              </div>
            </div>
            <div class="border-b p-2 flex justify-between items-center">
              <div class="text-gray-600 text-xs uppercase">Sunset</div>
              <div class="text-sm">
                <span class="font-medium">${this.getDate(location.sys.sunset)}</span>
                <span class="text-xs text-gray-600"> h</span>
              </div>
            </div>
          </div>
  
          <div class="w-full sm:w-2/3 sm:pl-10 ">
            <div id="forecast" class="overflow-x-auto"></div>
          </div>
        </div>
      </div>`;
  }

  renderSingleLocationForecast(forecast = []) {
    const data = this.convertForecastData(forecast);
    const forecastEl = document.getElementById('forecast');
  
    let all = ``;
  
    data.forEach(dayF => {
      let day = ``;
  
      dayF.forEach(hour => {
        day += hour
          ?
          `<div class="forecast-hover">
              <div class="mt-1 flex-1 text-xs hidden">
                <div class="text-xs">
                  <span class="font-medium">${hour.main.humidity}</span>
                  <span class="text-gray-600"> %</span>
                </div>
                <div class="text-xs">
                  <span class="font-medium">${hour.main.pressure}</span>
                  <span class="text-gray-600"> hPa</span>
                </div>
              </div>
              
              <img class="-my-1 mx-auto block" src="${this.client.getImageUrl(hour.weather[0].icon)}" alt="${hour.weather[0].main}" title="${hour.weather[0].main}">
              
              <div class="text-sm pt-1 mt-1 border-t">
                <div class="block">
                  <span class="font-medium">${this.roundDegrees(hour.main.temp)}</span>
                  <span class="text-xs text-gray-600">&deg;C</span>
                </div>
                
                <div class="hidden">
                  <span class="font-medium text-xs">${hour.wind.speed}</span>
                  <span class="text-xs text-gray-600"> km/h</span>
                </div>
              </div>
            </div>`
          :
          `<div class="flex-1"></div>`;
      });
  
      all +=
        `<div class="mb-4">
          <div class="mb-2">
            <div class="forecast-day">${this.getDayOfWeek(dayF)}</div>
          </div>
          <div class="flex">${day}</div>
        </div>`;
    });
  
    forecastEl.innerHTML =
      `<div class="flex mb-1">
        <div class="forecast-hour">
          <div class="text-xs border-b pb-1 text-gray-600">01:00 h</div>          
        </div>
        <div class="forecast-hour">
          <div class="text-xs border-b pb-1 text-gray-600">04:00 h</div>          
        </div>
        <div class="forecast-hour">
          <div class="text-xs border-b pb-1 text-gray-600">07:00 h</div>          
        </div>
        <div class="forecast-hour">
          <div class="text-xs border-b pb-1 text-gray-600">10:00 h</div>          
        </div>
        <div class="forecast-hour">
          <div class="text-xs border-b pb-1 text-gray-600">13:00 h</div>
        </div>
        <div class="forecast-hour">
          <div class="text-xs border-b pb-1 text-gray-600">16:00 h</div>
        </div>
        <div class="forecast-hour">
          <div class="text-xs border-b pb-1 text-gray-600">19:00 h</div>
        </div>
        <div class="forecast-hour">
          <div class="text-xs border-b pb-1 text-gray-600">22:00 h</div>  
        </div>
      </div>` + all;
  }

  private renderContentTitle(title = null, error = false) {
    this.contentTitleEl.style.display = title ? null : 'none';
    this.contentTitleEl.innerText = title || '';
    error ? this.contentTitleEl.classList.add('error') : this.contentTitleEl.classList.remove('error');
  }

  private roundDegrees(number: number): number {
    return Math.round(number);
  }

  private getDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = '0' + date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();
  
    // return hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return hours.substr(-2) + ':' + minutes.substr(-2);
  }
  
  // Get gmt timezone
  // Example: GMT 1
  private getGmt(seconds) {
    return seconds / 3600;
  }

  private getDayOfWeek(day) {
    let timestamp = 0;
  
    day.forEach(hour => {
      if (hour) {
        timestamp = hour.dt;
        return;
      }
    });
  
    const a = new Date(timestamp * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    return days[a.getDay()].toUpperCase() + ', ' + monthNames[a.getMonth()].substring(0, 3) + ' ' + a.getDate();
  }

  private convertForecastData(forecast) {
    let data = [];
    let arr = [];
    let prev = null;
  
    forecast.forEach((t, i) => {
      if (!prev) {
        arr.push(t);
      } else {
        if (new Date(prev.dt * 1000).getDay() === new Date(t.dt * 1000).getDay()) {
          arr.push(t);
  
          if (i === forecast.length - 1) {
            data.push(arr);
            arr = [];
          }
        } else {
          data.push(arr);
          arr = [];
          arr.push(t);
        }
      }
  
      prev = t;
    });
  
    const firstDay = data[0].length;
    const lastDay = data[data.length - 1].length;
  
    // Add nulls in the day array where forecast starts after some time
    // Example [nul, null, null, ...]
    for (let i = 0; i < 8 - firstDay; i++) {
      data[0].unshift(null);
    }
  
    // Add nulls in the day array where forecast ends before some time
    // Example [..., nul, null, null]
    for (let i = 0; i < 8 - lastDay; i++) {
      data[data.length - 1].push(null);
    }
  
    return data;
  }

}