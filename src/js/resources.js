import {getLocationsUrl, getSearchLocationUrl, request} from "./client";
import {renderError, renderLocations, renderSearchResult} from "./renderer";

export function fetchLocationsAndRender() {
  request({url: getLocationsUrl()}).then(res => {
    if (res.list) renderLocations(res.list);
  });
}

export function fetchLocationResultAndRender(value) {
  request({url: getSearchLocationUrl(value)}).then(res => {
    if (res) renderSearchResult(res);
  }).catch(error => {
    renderError(error, value);
  });
}