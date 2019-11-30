import ForecastListItem from "./forecast-list-item";

export default interface Forecast {
  city: {
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    id: number;
    name: string;
    sunrise: number;
    sunset: number;
    timezone: number;
  }
  cnt: 40;
  cod: string;
  list: Array<ForecastListItem>;
}