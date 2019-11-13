import {request, getLocationsUrl} from './client';
import {renderLocations} from "./renderer";

let locations = [];

request({url: getLocationsUrl()}).then(res => {
  if (res.list) {
    locations = res.list;
    renderLocations(locations);
  }
});