export default class Nav {

  static navSearchEl = document.getElementById('nav_search');

  navSearchTimeout;

  constructor() {
    this.init();
  }

  private init() {
    // Handle search on input event, wait a bit for more characters being added before redirecting to search page
    Nav.navSearchEl.addEventListener('input', ($event) => {
      const value = ($event.target as HTMLInputElement).value;

      if (this.navSearchTimeout) clearTimeout(this.navSearchTimeout);

      this.navSearchTimeout = setTimeout(() => {
        window.history.pushState(null, null, value ? `/search?q=${value}` : '/');
      }, 750);
    });

    // Handle search if key Enter is pressed and redirect to search page
    Nav.navSearchEl.addEventListener('keypress', ($event) => {
      const value = ($event.target as HTMLInputElement).value;
      let key = $event.which || $event.keyCode;

      if (key === 13) {
        if (this.navSearchTimeout) clearTimeout(this.navSearchTimeout);

        window.history.pushState(null, null, value ? `/search?q=${value}` : '/');
      }
    });
  }

}