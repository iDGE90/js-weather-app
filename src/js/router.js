import {
  fetchLocationAndRender, 
  fetchLocationsAndRender, 
  fetchLocationResultAndRender
} from "./resources";
import {checkSearchInputValue} from "./nav";

// Initialize routing and add event listeners to anchors
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
    if (anchor.target) continue;

    anchor.addEventListener('click', function($event) {
      $event.preventDefault();

      let href = '/';

      if ($event.target.nodeName !== 'A') {
        const anchor = $event.target.closest('a');

        if (anchor) href = anchor.getAttribute('href');
      } else {
        href = $event.target.getAttribute('href');
      }

      window.history.pushState(null, null, href);
    });
  }
}

// Route detection
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
    return;
  }

  // search
  if (splitUri[0] === 'search') {
    const q = getUrlParameter('q');

    if (q) {
      checkSearchInputValue(q);
      fetchLocationResultAndRender(q);
    }
    
    return;
  }

  window.history.pushState(null, null, '/');
}

// Get query param from url 
export function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

  let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  let results = regex.exec(location.search);

  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}