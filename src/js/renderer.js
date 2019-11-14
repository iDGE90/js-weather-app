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
        <td class="px-3 py-1">${location.name} (${location.sys.country})</td>
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

  contentEl.style.display = locations.length > 0 ? null : 'none';
}

// Render content title
function renderContentTitle(title = null) {
  contentTitleEl.style.display = title ? null : 'none';
  contentTitleEl.innerText = title || '';
}