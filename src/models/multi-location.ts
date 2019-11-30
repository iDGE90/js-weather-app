import Location from "./location";

export default interface MultiLocation {
  cod: string;
  count: number;
  list: Array<Location>;
  message: string;
}