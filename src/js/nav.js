import {fetchLocationsAndRender, fetchLocationResultAndRender} from './resources';

// Handle navigation search
export function initNavigation() {
  let navSearchTimeout;

  document.getElementById('nav_search').addEventListener('input', ($event) => {
    const value = $event.target.value;

    if (navSearchTimeout) clearTimeout(navSearchTimeout);

    navSearchTimeout = setTimeout(() => {
      window.history.pushState(null, null, value ? `/search?q=${value}` : '/');
    }, 750);
  });
}