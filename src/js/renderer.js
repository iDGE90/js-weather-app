import {addListenersOnAnchors} from "./router";
import {getImageUrl} from "./client";

const contentEl = document.getElementById('content');
const contentTitleEl = document.getElementById('content_title');

export function renderLocations(locations = []) {
  renderTable(locations);
  renderContentTitle('Showing weather information for locations around Bitola.');
}

export function renderSearchResult(locations) {
  renderTable(locations);
  renderContentTitle(locations.length > 0 ? `We found ${locations.length} locations.` : `We did't find any locations.`);
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
        <td class="px-3 py-2">
          <a href="/location/${location.id}" class="text-blue-600 hover:text-blue-700">${location.name} (${location.sys.country})</a>
        </td>
        <td class="px-3 py-2">${location.weather[0].main}</td>
        <td class="px-3 py-2">${location.wind.speed} km/h</td>
        <td class="px-3 py-2">${location.main.humidity} %</td>
        <td class="px-3 py-2 text-right">
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
      <div class="text-center text-3xl">${location.name} (${location.sys.country})</div>
      <div class="text-center text-xs mb-5">${getDate(location.dt)}h -  (GMT ${getGmt(location.timezone)})</div>

      <div class="block sm:flex">
        <div class="w-full sm:w-1/3">
          <div class="text-center border-b">
            <img class="-my-4 mx-auto" src="${getImageUrl(location.weather[0].icon, true)}" alt="${location.weather[0].main}" title="${location.weather[0].main}">
            <div class="pb-3">
              <span class="text-4xl font-bold">${location.main.temp}</span>
              <span class="text">&deg;C</span>
            </div>
          </div>
          <div class="flex flex-row border-b">
            <div class="flex-1 text-center py-2 border-r">
              <div class="text-gray-600 text-xs uppercase" style="font-size: 0.65rem;">min</div>
              <div>
                <span class="font-medium">${location.main.temp_min}</span>
                <span class="text-xs"> &deg;C</span>
              </div>
            </div>
            <div class="flex-1 text-center py-2">
              <div class="text-gray-600 text-xs uppercase" style="font-size: 0.65rem;">max</div>
              <div>
                <span class="font-medium">${location.main.temp_max}</span>
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
                <span class="font-medium">${location.wind.deg}</span>
                <span class="text-xs text-gray-600"> &deg;</span>
              </div>
            </div>
          </div>
          <div class="border-b p-2 flex justify-between items-center">
            <div class="text-gray-600 text-xs uppercase">Sunrise</div>
            <div class="text-sm">
              <span class="font-medium">${getDate(location.sys.sunrise)}</span>
              <span class="text-xs text-gray-600"> h</span>
            </div>
          </div>
          <div class="border-b p-2 flex justify-between items-center">
            <div class="text-gray-600 text-xs uppercase">Sunset</div>
            <div class="text-sm">
              <span class="font-medium">${getDate(location.sys.sunset)}</span>
              <span class="text-xs text-gray-600"> h</span>
            </div>
          </div>
        </div>

        <div class="w-full sm:w-2/3 pl-10">
          forecast
        </div>
      </div>
    </div>`;
}

function getDate(timestamp) {
  const date = new Date(timestamp * 1000);  
  const hours = '0' + date.getHours();  
  const minutes = '0' + date.getMinutes();  
  const seconds = '0' + date.getSeconds();
  
  // return hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return hours.substr(-2) + ':' + minutes.substr(-2);
}

function getGmt(seconds) {
  return seconds / 3600;
}