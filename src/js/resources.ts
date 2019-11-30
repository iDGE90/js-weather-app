import Client from "./client";
import Renderer from "./renderer";

export default class Resources {

  client: Client;
  renderer: Renderer;

  constructor() {
    this.client = new Client();
    this.renderer = new Renderer();
  }

  fetchLocationsAndRender() {
    this.client.request({url: this.client.getLocationsUrl()}).then(res => {
      if (res.list) this.renderer.renderLocations(res.list);
    });
  }

  fetchLocationAndRender(id) {
    this.client.request({url: this.client.getLocationByIdUrl(id)}).then(res => {
      if (res) this.fetchLocationForecastAndRender(id, res);
    }).catch(error => {
      this.renderer.renderError(error);
    });
  }

  fetchLocationForecastAndRender(id, location) {
    this.client.request({url: this.client.getForecastUrl(id)}).then(res => {
      if (res) {
        this.renderer.renderSingleLocation(location);
        this.renderer.renderSingleLocationForecast(res.list);
      }
    }).catch(error => {
      this.renderer.renderError(error);
    });
  }

  fetchLocationResultAndRender(value) {
    this.client.request({url: this.client.getSearchLocationUrl(value)}).then(res => {
      if (res) this.renderer.renderSearchResult(res.list);
    }).catch(error => {
      this.renderer.renderError(error, value);
    });
  }

}