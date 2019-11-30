import Resources from "./resources";
import Utilities from "./utilities";

export default class Router {

  resources: Resources;

  constructor() {
    this.resources = new Resources();

    this.init();
  }

  // Initialize routing and add event listeners to anchors
  private init(): void {
    window.history.pushState = (f => function pushState() {
      const ret = f.apply(this, arguments);

      window.dispatchEvent(new Event('pushstate'));
      window.dispatchEvent(new Event('locationchange'));

      return ret;
    })(history.pushState);

    window.history.replaceState = (f => function replaceState() {
      const ret = f.apply(this, arguments);

      window.dispatchEvent(new Event('replacestate'));
      window.dispatchEvent(new Event('locationchange'));

      return ret;
    })(history.replaceState);

    window.addEventListener('popstate', () => {
      window.dispatchEvent(new Event('locationchange'));
    });

    window.addEventListener('locationchange', this.getRouteAndAct.bind(this));

    Utilities.addListenersOnAnchors(document.getElementsByTagName('a'));

    this.getRouteAndAct();
  }

  // Route detection
  private getRouteAndAct(): void {
    const uri = (window.location.pathname).substr(1);
    const splitUri = uri.split('/');

    console.log('location changed!', uri, splitUri);
    // TODO: simple regex to catch routes and render appropriate elements

    // /
    if (splitUri[0] === '') {
      this.resources.fetchLocationsAndRender();
      return;
    }

    // locations/:id
    if (splitUri[0] === 'location' && splitUri[1]) {
      this.resources.fetchLocationAndRender(splitUri[1]);
      return;
    }

    // search
    if (splitUri[0] === 'search') {
      const q = Utilities.getUrlParameter('q');

      if (q) {
        Utilities.checkSearchInputValue(q);
        this.resources.fetchLocationResultAndRender(q);
      }

      return;
    }

    window.history.pushState(null, null, '/');
  }

}