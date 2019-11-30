import Resources from "./resources";

export default class Router {

  resources: Resources;

  constructor() {
    this.resources = new Resources();

    this.init();
  }

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

    this.addListenersOnAnchors(document.getElementsByTagName('a'));

    this.getRouteAndAct();
  }

  // extract to new class
  addListenersOnAnchors(anchors: HTMLCollectionOf<HTMLAnchorElement>): void {
    for (let anchor of anchors) {
      if (anchor.target) continue;

      anchor.addEventListener('click', function ($event) {
        $event.preventDefault();

        const target = $event.target as HTMLElement;

        let href = '/';

        if (target.nodeName !== 'A') {
          const anchor = target.closest('a');

          if (anchor) href = anchor.getAttribute('href');
        } else {
          href = target.getAttribute('href');
        }

        window.history.pushState(null, null, href);
      });
    }
  }

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
      const q = this.getUrlParameter('q');

      if (q) {
        // checkSearchInputValue(q);
        this.resources.fetchLocationResultAndRender(q);
      }

      return;
    }

    window.history.pushState(null, null, '/');
  }

  private getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
  
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

}