import {request} from './client.js';

let cities = [];

request({
  url: 'https://api.openweathermap.org/data/2.5/find?lat=41.03&lon=21.34&cnt=50&appid=a83509480d3c4dbd72473b52e52c59ab&units=metric'
}).then(res => {
  cities = res.list;
  renderCities();
});

function renderCities() {
  const contentEl = document.getElementById('content');

  let tableRows = '';

  cities.forEach((city) => {
    tableRows += `<tr class="text-xs bg-white odd:bg-gray-200">
                <td>${city.name}</td>
                <td class="text-right">${city.main.temp} &deg;C</td>
            </tr>`;
  });

  contentEl.innerHTML = `<table class="w-full">
      <thead>
        <tr>
          <td class="pb-2 w-1/2">City</td>
          <td class="pb-2 w-1/2 text-right">Temp</td>
        </tr>
      </thead>
      <tbody class="">${tableRows}</tbody>
    </table>`;
}