import ForecastListItem from "../models/forecast-list-item";
import Nav from "./nav";

export default class Utilities {

  // Get query param from url
  static getUrlParameter(name: string): string {
    let newName = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

    let regex = new RegExp('[\\?&]' + newName + '=([^&#]*)');
    let results = regex.exec(location.search);

    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  // Add event listeners to anchors and don't redirect (refresh page)
  static addListenersOnAnchors(anchors: HTMLCollectionOf<HTMLAnchorElement>): void {
    for (let anchor of anchors as any) {
      if (anchor.target) continue;

      anchor.addEventListener('click', function ($event: Event) {
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

  // Round celsiuses degrees if necessary
  static roundDegrees(number: number): number {
    return Math.round(number);
  }

  // Get date from unix timestamp
  // Example: 21:15
  static getDate(timestamp: number): string {
    const date = new Date(timestamp * 1000);
    const hours = '0' + date.getHours();
    const minutes = '0' + date.getMinutes();
    const seconds = '0' + date.getSeconds();

    // return hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return hours.substr(-2) + ':' + minutes.substr(-2);
  }

  // Get gmt timezone
  // Example: GMT 1
  static getGmt(seconds: number): number {
    return seconds / 3600;
  }

  // Get day of week and date from timestamp
  // Example: Monday, Nov 25
  static getDayOfWeek(day: Array<ForecastListItem>): string {
    let timestamp = 0;

    day.forEach(hour => {
      if (hour) {
        timestamp = hour.dt;
        return;
      }
    });

    const a = new Date(timestamp * 1000);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    return days[a.getDay()].toUpperCase() + ', ' + monthNames[a.getMonth()].substring(0, 3) + ' ' + a.getDate();
  }

  // Check if query param exists and populate search input in navigation
  static checkSearchInputValue(q: string): void {
    const navEl = Nav.navSearchEl as HTMLInputElement;

    if (q && !(navEl.value)) navEl.value = q;
  }

}