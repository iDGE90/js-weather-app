import Client from "./client";
import Renderer from "./renderer";
import Location from "../models/location";
import Forecast from "../models/forecast";
import MultiLocation from "../models/multi-location";
import AppError from "../models/app-error";

export default class Resources {

  client: Client;
  renderer: Renderer;

  constructor() {
    this.client = new Client();
    this.renderer = new Renderer();
  }

  // Fetch and render locations info laid within definite circle that is specified by center point
  fetchLocationsAndRender(): void {
    this.client.request({url: this.client.getLocationsUrl()}).then((cycle: MultiLocation) => {
      if (cycle.list) this.renderer.renderLocations(cycle.list);
    }).catch((error: AppError) => {
      this.renderer.renderError(error);
    });
  }

  // Fetch and render info for single location
  fetchLocationAndRender(id: string): void {
    this.client.request({url: this.client.getLocationByIdUrl(id)}).then((location: Location) => {
      if (location) this.fetchLocationForecastAndRender(id, location);
    }).catch((error: AppError) => {
      this.renderer.renderError(error);
    });
  }

  // Fetch and render forecast info for single location
  fetchLocationForecastAndRender(id: string, location: Location): void {
    this.client.request({url: this.client.getForecastUrl(id)}).then((forecast: Forecast) => {
      if (forecast) {
        this.renderer.renderSingleLocation(location);
        this.renderer.renderSingleLocationForecast(forecast.list);
      }
    }).catch((error: AppError) => {
      this.renderer.renderError(error);
    });
  }

  // Fetch and render list of locations for search value
  fetchLocationResultAndRender(value: string): void {
    this.client.request({url: this.client.getSearchLocationUrl(value)}).then((result: MultiLocation) => {
      if (result) this.renderer.renderSearchResult(result.list);
    }).catch((error: AppError) => {
      this.renderer.renderError(error, value);
    });
  }

}