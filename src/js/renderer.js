import {addListenersOnAnchors} from "./router";
import {getImageUrl} from "./client";

const contentEl = document.getElementById('content');
const contentTitleEl = document.getElementById('content_title');

export function renderLocations(locations = []) {
  renderTable(locations);
  renderContentTitle('Showing current temperature for locations around Bitola.');
}

export function renderSearchResult(location) {
  renderTable([location]);
  renderContentTitle('Showing search result.');
}

export function renderSingleLocation(location) {
  renderContentTitle();
  renderLocation(location);
}

export function renderError(error, q = '') {
  switch(error.cod) {
    case '404':
      renderContentTitle(`No location result for: ${q}.`);
      break;
    default:
      renderContentTitle(`Error: ${error.message}.`);
  }

  renderTable();
}

// Render table with locations
function renderTable(locations = []) {
  let tableRows = '';

  locations.forEach((location) => {
    tableRows +=
      `<tr class="text-xs bg-white odd:bg-gray-100">
        <td class="px-3 py-1">
          <a href="/location/${location.id}" class="text-blue-600 hover:text-blue-700">${location.name} (${location.sys.country})</a>
        </td>
        <td class="px-3 py-1">${location.weather[0].main}</td>
        <td class="px-3 py-1">${location.wind.speed} km/h</td>
        <td class="px-3 py-1">${location.main.humidity} %</td>
        <td class="px-3 py-1 text-right">
          <span class="font-bold">${location.main.temp}</span>
          <span> &deg;C</span>
        </td>
      </tr>`;
  });

  contentEl.innerHTML =
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

  addListenersOnAnchors(contentEl.getElementsByTagName('a'));

  contentEl.style.display = locations.length > 0 ? null : 'none';
}

// Render content title
function renderContentTitle(title = null) {
  contentTitleEl.style.display = title ? null : 'none';
  contentTitleEl.innerText = title || '';
}

// Render location
function renderLocation(location = null) {
  contentEl.innerHTML =
    `<div>
      <div>${location.name} (${location.sys.country})</div>
      <div>Temperature: ${location.main.temp} &deg;C</div>
      <div>Temperature Min: ${location.main.temp_min} &deg;C</div>
      <div>Temperature Max: ${location.main.temp_max} &deg;C</div>
      <div>Humidity: ${location.main.humidity} %</div>
      <div>Pressure: ${location.main.pressure} hPa</div>
      <div>Weather: ${location.weather[0].main}</div>
      <div>
        <img src="${getImageUrl(location.weather[0].icon, true)}" alt="${location.weather[0].main}">
      </div>
      <div>Timezone: ${location.timezone}</div>
      <div>Wind Speed: ${location.wind.speed} km/h</div>
      <div>Wind Degrees: ${location.wind.deg} deg</div>
      <div>Sunrise: ${getDate(location.sys.sunrise)}</div>
      <div>Sunset: ${getDate(location.sys.sunset)}</div>
    </div>`;
}

function getDate(timestamp) {
  var date = new Date(timestamp * 1000);
// Hours part from the timestamp
  var hours = "0" + date.getHours();
// Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
  return hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
}