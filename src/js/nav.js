const navSearchEl = document.getElementById('nav_search');

// Handle navigation search
export function initNavigation() {
  let navSearchTimeout;

  // Handle search on input event, wait a bit for more characters being added before redirecting to search page
  navSearchEl.addEventListener('input', ($event) => {
    const value = $event.target.value;

    if (navSearchTimeout) clearTimeout(navSearchTimeout);

    navSearchTimeout = setTimeout(() => {
      window.history.pushState(null, null, value ? `/search?q=${value}` : '/');
    }, 750);
  });

  // Handle search if key Enter is pressed and redirect to search page
  navSearchEl.addEventListener('keypress', ($event) => {
    const value = $event.target.value;
    let key = $event.which || $event.keyCode;

    if (key === 13) {
      if (navSearchTimeout) clearTimeout(navSearchTimeout);

      window.history.pushState(null, null, value ? `/search?q=${value}` : '/');
    }
  });
}

// If search page reload fill search input
export function checkSearchInputValue(q) {
  if (q && !navSearchEl.value) navSearchEl.value = q;
}