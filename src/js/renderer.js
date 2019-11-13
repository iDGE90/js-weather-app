const contentEl = document.getElementById('content');

export function renderLocations(cities = []) {
  let tableRows = '';

  cities.forEach((city) => {
    tableRows +=
      `<tr class="text-xs bg-white odd:bg-gray-100">
        <td class="px-3 py-1">${city.name}</td>
        <td class="px-3 py-1 text-right">${city.main.temp} &deg;C</td>
      </tr>`;
  });

  contentEl.innerHTML =
    `<div class="text-center text-sm pb-3">Showing current temperature for 25 locations around Bitola.</div>
    <table class="w-full">
      <thead>
        <tr>
          <td class="px-3 py-1 pb-2 w-1/2">City</td>
          <td class="px-3 py-1 pb-2 w-1/2 text-right">Temp</td>
        </tr>
      </thead>
      <tbody class="">${tableRows}</tbody>
    </table>`;
}