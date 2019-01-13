import {SensorData} from "./sensor-data";

export class ITS {
  stateList: SensorData[];
  forecastDataList: SensorData[];
}
export class ITSForecast {
  its: SensorData;
  forecast: SensorData[];
}


