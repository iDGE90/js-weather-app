import {getLocationByIdUrl, getLocationsUrl, getSearchLocationUrl, request, getForecastUrl} from "./client";
import {
  renderError,
  renderLocations,
  renderSearchResult,
  renderSingleLocation,
  renderSingleLocationForecast
} from "./renderer";

export function fetchLocationsAndRender() {
  request({url: getLocationsUrl()}).then(res => {
    if (res.list) renderLocations(res.list);
  });
}

export function fetchLocationResultAndRender(value) {
  request({url: getSearchLocationUrl(value)}).then(res => {
    if (res) renderSearchResult(res.list);
  }).catch(error => {
    renderError(error, value);
  });
}

export function fetchLocationAndRender(id) {
  request({url: getLocationByIdUrl(id)}).then(res => {
    if (res) fetchLocationForecastAndRender(id, res);
  }).catch(error => {
    renderError(error, value);
  });
}

export function fetchLocationForecastAndRender(id, location) {
  request({url: getForecastUrl(id)}).then(res => {
    if (res) {
      renderSingleLocation(location);
      renderSingleLocationForecast(res.list);
    }
  }).catch(error => {
    renderError(error, value);
  });
}