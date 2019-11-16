// Initialize routing and add event listeners to anchors
import {fetchLocationAndRender, fetchLocationsAndRender} from "./resources";

export function initRouting() {
  window.history.pushState = ( f => function pushState(){
    const ret = f.apply(this, arguments);

    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));

    return ret;
  })(history.pushState);

  window.history.replaceState = ( f => function replaceState(){
    const ret = f.apply(this, arguments);

    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));

    return ret;
  })(history.replaceState);

  window.addEventListener('popstate',()=>{
    window.dispatchEvent(new Event('locationchange'))
  });

  window.addEventListener('locationchange', getRouteAndAct);

  addListenersOnAnchors(document.getElementsByTagName('a'));
}

// Add event listeners to anchor and don't redirect (refresh page)
export function addListenersOnAnchors(anchors) {
  for (let anchor of anchors) {
    anchor.addEventListener('click', function($event) {
      $event.preventDefault();

      const href = $event.target.getAttribute('href');

      window.history.pushState(null, null, href);
    });
  }
}

export function getRouteAndAct() {
  const uri = (window.location.pathname).substr(1);
  const splitUri = uri.split('/');

  console.log('location changed!', uri, splitUri);
  // TODO: simple regex to catch routes and render appropriate elements

  // /
  if (splitUri[0] === '') {
    fetchLocationsAndRender();
    return;
  }

  // locations/:id
  if (splitUri[0] === 'location' && splitUri[1]) {
    fetchLocationAndRender(splitUri[1]);
  }
}