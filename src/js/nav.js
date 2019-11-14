import {fetchLocationsAndRender, fetchLocationResultAndRender} from './resources';

// Handle navigation search
export function navigation() {
  let navSearchTimeout;

  document.getElementById('nav_search').addEventListener('input', ($event) => {
    const value = $event.target.value;

    if (navSearchTimeout) clearTimeout(navSearchTimeout);

    navSearchTimeout = setTimeout(() => {
      value ? fetchLocationResultAndRender(value) : fetchLocationsAndRender();
    }, 750);
  });
}